import memberDB from '../repository/member.db'; // Importing the member database functions
import { Member } from '../model/member'; // Importing the Member model
import { MemberInput } from '../types';

// Service method to fetch all members
const getAllMembers = async (): Promise<Member[]> => {
    try {
        return await memberDB.getAllMembers(); // Call the getAllMembers function from memberDB
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching all members.');
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
   
    const { username, email, phoneNumber, password, profile, payment } = memberData;

    if (!Member.validatePassword(password)) {
        throw new Error("Password must contain at least 8 characters, including an uppercase letter, lowercase letter, symbol (@#$), and a number.");
    }

    if (!Member.validatePhoneNumber(phoneNumber)) {
        throw new Error("Invalid phone number format. It should start with +32 or 04 and have 10 digits.");
    }

    try {
        return await memberDB.createMember(memberData); // Call the createMember function from memberDB
    } catch (error) {
        console.error(error);
        throw new Error('Error creating new member.');
    }
};
const updateMember = async (id: number, memberData: MemberInput): Promise<Member> => {
    const { username, email, phoneNumber, password, profile, payment,membership } = memberData;

    try {
        // Assuming memberDB.updateMember handles updating the member data and returns the updated member
        const updatedMember = await memberDB.updateMember(id, {
            username,
            email,
            phoneNumber,
            password,
            profile,
            payment,
            membership
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

export default {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
};
