import { Member } from '../model/member';
import { Profile } from '../model/profile';
import memberRepository from '../repository/member.db';

// Assuming this function is part of a class; if it's standalone, remove 'this.'
const registerMember = (newMember: Member): number => {
    // Check if username is unique
    if (!isUsernameUnique(newMember.getUsername())) {
        throw new Error("Username is already taken. Please choose another.");
    }

    // Add the member to the repository
    memberRepository.addMember(newMember);
    console.log("Registration successful! Redirecting to dashboard...");
    
    // Return the new member's ID
    return newMember.getId()!;
};

const isUsernameUnique = (username: string): boolean => {
    return memberRepository.isUsernameUnique(username);
};

// Function to get all members
const getAllMembers = (): Member[] => {
    return memberRepository.getAllMembers();
};

// Function to get a member by ID
const getMemberById = (id: number): Member => {
    const member = memberRepository.getMemberById( {id} ); // Assuming id is already a number
    if (!member) {
        throw new Error(`Member with id ${id} does not exist.`);
    }
    return member;
};

const updateProfile = async (id: number, profileUpdates: { name?: string; surname?: string; height?: number; weight?: number; }): Promise<Member | null> => {
    try {
      const member = memberRepository.getMemberById({ id }); // Retrieve the member by ID
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
      memberRepository.updateMember(member); // This updates the member in the array
  
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
