import { Member } from '../model/member';
import memberRepository from '../repository/member.db';

// Assuming this function is part of a class; if it's standalone, remove 'this.'
const registerMember = (newMember: Member): void => {
    // Check if username is unique
    if (!isUsernameUnique(newMember.getUsername())) {
        throw new Error("Username is already taken. Please choose another.");
    }

    // Validate phone number (ensure it meets the criteria)
    if (!newMember.getPhoneNumber() || !/^(?:(?:\+32|04)\d{8})$/.test(newMember.getPhoneNumber())) {
        throw new Error("Invalid phone number format.");
    }

    // Validate password (ensure it meets the criteria)
    if (!newMember.getPassword() || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!&+=])[A-Za-z\d@#$%^&*!&+=]{8,}$/.test(newMember.getPassword())) {
        throw new Error("Password does not meet the required criteria.");
    }

    // Add the member to the repository
    memberRepository.addMember(newMember);
    console.log("Registration successful! Redirecting to dashboard...");
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

// Exporting functions for use in other modules
export default {
    getAllMembers,
    registerMember,
    getMemberById,
};
