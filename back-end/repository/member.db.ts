import { Member } from '../model/member';
import { Profile } from '../model/profile';
import { Payment } from '../model/payment'; // Import the Payment class

// Create an array to hold the members
const members: Member[] = [
    new Member({
        id: 1,
        username: "XxX_ibench225_XxX",
        email: "randomahhemail@gmail.com",
        phoneNumber: "0475829054",
        password: "Password@1",
        profile: new Profile({
            id: 1,
            name: "john",
            surname: "smith",
            height: 154,
            weight: 50
        }),
        payment: [ // Initialize payments directly here
            new Payment({ amount: 50, date: new Date('2024-01-15'), dueDate: new Date('2024-02-15'), paymentStatus: true }),
            new Payment({ amount: 75, date: new Date('2024-02-10'), dueDate: new Date('2024-03-10'), paymentStatus: false }),
        ]
    }),
    new Member({
        id: 2,
        username: "WifelessWarrior",
        email: "idk@gmail.com",
        phoneNumber: "0403892754",
        password: "Secure@Password2",
        profile: new Profile({
            id: 2,
            name: "bla",
            surname: "smith",
            height: 123,
            weight: 60
        }),
        payment: [ // Initialize payments directly here
            new Payment({ amount: 100, date: new Date('2024-03-20'), dueDate: new Date('2024-04-20'), paymentStatus: true }),
        ]
    }),
];

const getNextId = (): number => {
    const ids = members.map(member => member.getId() || 0);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

const getAllMembers = (): Member[] => members;

const getMemberById = ({ id }: { id: number }): Member | null => {
    const member = members.find((member) => member.getId() === id);
    if (!member) {
        throw new Error(`Member with id ${id} does not exist.`);
    }
    return member;
};

const isUsernameUnique = (username: string): boolean => {
    return !members.some((member) => member.getUsername() === username);
};

const addMember = (newMember: Member): void => {
    if (isUsernameUnique(newMember.getUsername())) {
        newMember.setId(getNextId()); // Assign the next available ID
        members.push(newMember);
    } else {
        throw new Error(`Username ${newMember.getUsername()} is already taken.`);
    }
};

const updateMember = (updatedMember: Member): void => {
    const index = members.findIndex((member) => member.getId() === updatedMember.getId());
    if (index !== -1) {
        members[index] = updatedMember; // Replace the existing member with the updated one
    } else {
        throw new Error(`Member with id ${updatedMember.getId()} does not exist.`);
    }
};

// Exporting functions for use in other modules
export default {
    getMemberById,
    isUsernameUnique,
    addMember,
    getAllMembers,
    updateMember,
};