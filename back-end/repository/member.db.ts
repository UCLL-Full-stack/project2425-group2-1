import { Member } from '../model/member';
import { Profile } from '../model/profile';

const members = [
    new Member({
        id: 1,
        username: "XxX_ibench225_XxX",
        email: "randomahhemail@gmail.com",
        phoneNumber: "0475829054",
        password: "Password@1",
        profile : new Profile({
            id : 1,
            name : "john",
            surname : "smith",
            height : 154,
            weight : 50
        })
    }),
    new Member({
        id: 2,
        username: "WifelessWarrior",
        email: "idk@gmail.com",
        phoneNumber: "0403892754",
        password: "Secure@Password2",
        profile : new Profile({
            id : 2,
            name : "bla",
            surname : "smith",
            height : 123,
            weight : 60
        })
    }),
];

const getAllMembers = (): Member[] => {
    return members;
};

const getMemberById = ({ id }: { id: number }): Member | null => {
    try {
        return members.find((member) => member.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const isUsernameUnique = (username: string): boolean => {
    return !members.some((member) => member.getUsername() === username);
};

const addMember = (newMember: Member): void => {
    members.push(newMember);
};

const updateMember = (updatedMember: Member): void => {
    const index = members.findIndex((member) => member.getId() === updatedMember.getId());
    if (index !== -1) {
        members[index] = updatedMember; // Replace the existing member with the updated one
    } else {
        throw new Error(`Member with id ${updatedMember.getId()} does not exist.`);
    }
};

export default {
    getMemberById,
    isUsernameUnique,
    addMember,
    getAllMembers,
    updateMember,
};