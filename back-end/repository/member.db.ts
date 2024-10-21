import { Member } from '../model/member';

const members = [
    new Member({
        id: 1,
        name: "John",
        surname: "Doe",
        username: "XxX_ibench225_XxX",
        email: "randomahhemail@gmail.com",
        phoneNumber: "0475829054",
        password: "Password@1"
    }),
    new Member({
        id: 2,
        name: "Jane",
        surname: "Doehhh",
        username: "WifelessWarrior",
        email: "idk@gmail.com",
        phoneNumber: "0403892754",
        password: "Secure@Password2"
    }),
];

const getAllMembers = (): Member[] => {
    return members;
};

const getMemberById = ({ id }: { id: number }): Member | null => {
    try {
        return members.find((Member) => Member.getId() === id) || null;
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

export default {
    getMemberById,
    isUsernameUnique,
    addMember,
    getAllMembers,
};