import memberDB from '../repository/member.db'; // Importing the member database functions
import { Member } from '../model/member'; // Importing the Member model
import { MemberInput, AuthenticationResponse } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

// Service method to fetch all members
const getAllMembers = async (): Promise<Member[]> => {
    try {
        return await memberDB.getAllMembers(); // Call the getAllMembers function from memberDB
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching all members.');
    }
};

// const getAllMembers = async (username , role): Promise<Member[]> => {
//     try {
//         return await memberDB.getAllMembers(); // Call the getAllMembers function from memberDB
//     } catch (error) {
//         console.error(error);
//         throw new Error('Error fetching all members.');
//     }
// };



const getMemberByUsername = async ({ username }: { username: string }): Promise<Member | null> => {
    try {
        const member = await memberDB.getUserByUsername({ username }); // Fetch member from database by username
        if (!member) {
            throw new Error(`Member with username ${username} not found.`);
        }
        return member;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching member by username.');
    }
};

// Service method to fetch a member by their ID
const getMemberById = async (id: number): Promise<Member> => {
    try {
        const member = await memberDB.getMemberById({ id }); // Call the getMemberById function from memberDB
        if (!member) {
            throw new Error(`Member with id ${id} does not exist.`); // Error if member not found
        }
        return member;
    } catch (error) {
        console.error(error);
        throw new Error(`Error fetching member with id ${id}.`);
    }
};

// Service method to create a new member
const createMember = async (memberData: MemberInput): Promise<Member> => {
    const { username, email, phoneNumber, password, role, profile, payment } = memberData;

    if (!Member.validatePassword(password)) {
        throw new Error(
            'Password must contain at least 8 characters, including an uppercase letter, lowercase letter, symbol (@#$), and a number.'
        );
    }

    if (!Member.validatePhoneNumber(phoneNumber)) {
        throw new Error(
            'Invalid phone number format. It should start with +32 or 04 and have 10 digits.'
        );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newMember = {
        ...memberData,
        password: hashedPassword, // Replace plain password with the hashed password
    };
    try {
        return await memberDB.createMember(newMember); // Call the createMember function from memberDB
    } catch (error) {
        console.error(error);
        throw new Error('Error creating new member.');
    }
};
const updateMember = async (id: number, memberData: MemberInput): Promise<Member> => {
    const { username, email, phoneNumber, password, role, profile, payment, membership } =
        memberData;

    try {
        // Assuming memberDB.updateMember handles updating the member data and returns the updated member
        const updatedMember = await memberDB.updateMember(id, {
            username,
            email,
            phoneNumber,
            password,
            role,
            profile,
            payment,
            membership,
        });

        if (!updatedMember) {
            throw new Error(`Member with id ${id} could not be updated.`); // Error if member update failed
        }

        return updatedMember;
    } catch (error) {
        console.error(error);
        throw new Error(`Error updating member with id ${id}.`);
    }
};

const authentication = async ({
    username,
    password,
}: MemberInput): Promise<AuthenticationResponse> => {
    const member = await getMemberByUsername({ username });
    if (!member) {
        throw new Error('Member not found');
    }

    const isValidPassword = await bcrypt.compare(password, member.password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }
    // Extract the fullname from the profile
    const fullname = member.profile
        ? `${member.profile.firstname} ${member.profile.surname}`
        : 'Unknown User';
    return {
        token: generateJwtToken({ username, role: member.role }),
        username,
        fullname,
    };
};

export default {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    getMemberByUsername,
    authentication,
};
// function generateJwtToken(arg0: { username: string; }): string {
//     throw new Error('Function not implemented.');
// }
