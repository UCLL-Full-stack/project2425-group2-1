import { Member } from '../model/member';
import { Profile } from '../model/profile';
import memberRepository from '../repository/member.db';

// Function to register a new member
const registerMember = async (newMember: Member): Promise<number> => {
    // Check if username is unique
    if (!(await isUsernameUnique(newMember.getUsername()))) {
        throw new Error('Username is already taken. Please choose another.');
    }

    // Add the member to the repository
    await memberRepository.addMember(newMember);
    console.log('Registration successful! Redirecting to dashboard...');

    // Return the new member's ID
    return newMember.getId()!;
};

// Function to check if a username is unique
const isUsernameUnique = async (username: string): Promise<boolean> => {
    return await memberRepository.isUsernameUnique(username);
};

// Function to get all members
const getAllMembers = async (): Promise<Member[]> => {
    return await memberRepository.getAllMembers();
};

// Function to get a member by ID
const getMemberById = async (id: number): Promise<Member> => {
    const member = await memberRepository.getMemberById(id);
    if (!member) {
        throw new Error(`Member with id ${id} does not exist.`);
    }
    return member;
};

// Function to update a member's profile
const updateProfile = async (
    id: number,
    profileUpdates: { name?: string; surname?: string; height?: number; weight?: number }
): Promise<Member | null> => {
    try {
        const member = await memberRepository.getMemberById(id); // Retrieve the member by ID
        if (!member) {
            console.error(`Member with ID ${id} not found.`);
            return null;
        }

        const profile = member.getProfile();

        // Update the profile with the provided values
        if (profileUpdates.name !== undefined) {
            profile.setName(profileUpdates.name);
        }
        if (profileUpdates.surname !== undefined) {
            profile.setSurname(profileUpdates.surname);
        }
        if (profileUpdates.height !== undefined) {
            profile.setHeight(profileUpdates.height);
        }
        if (profileUpdates.weight !== undefined) {
            profile.setWeight(profileUpdates.weight);
        }

        // Persist the updated member in the repository
        await memberRepository.updateMember(member);

        return member; // Return the updated member
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

// Exporting functions for use in other modules
export default {
    getAllMembers,
    registerMember,
    getMemberById,
    updateProfile,
};
