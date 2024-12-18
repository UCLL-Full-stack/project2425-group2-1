import database from '../util/database';
import { Member } from '../model/member';
import { Profile } from '../model/profile';
import { Payment } from '../model/payment';
import { MemberInput } from '../types';

const getAllMembers = async (): Promise<Member[]> => {
    try {
        const membersPrisma = await database.member.findMany({
            include: {
                profile: true,
                payments: true,
            },
        });
        return membersPrisma.map((memberPrisma) => Member.from(memberPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createMember = async (memberData: MemberInput): Promise<Member> => {
    const { username, email, phoneNumber, password, profile, payment } = memberData;
    
    try {
        const memberPrisma = await database.member.create({
            data: {
                username,
                email,
                phoneNumber,
                password,
                ...(profile && { profile: { create: profile } }), // Creating a profile if passed
                payments: {
                    create: payment.map((p) => ({
                        amount: p.amount,
                        date: p.date,
                        dueDate: p.dueDate,
                        paymentStatus: p.paymentStatus,
                    })),
                },
            },
            include: {
                profile: true,
                payments: true,
            },
        });

        return Member.from(memberPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



const getMemberById = async ({ id }: { id: number }): Promise<Member | null> => {
    try {
        const memberPrisma = await database.member.findUnique({
            where: { id },
            include: {
                profile: true,
                payments: true,
            },
        });

        return memberPrisma ? Member.from(memberPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Method to update a member's details
const updateMember = async (id: number, memberData: MemberInput): Promise<Member> => {
    const { username, email, phoneNumber, password, profile, payment } = memberData;

    try {
        // Update member in the database
        const updatedMemberPrisma = await database.member.update({
            where: { id },
            data: {
                username,
                email,
                phoneNumber,
                password,
                ...(profile && { profile: { update: profile } }),  // Update profile if passed
                payments: {
                    deleteMany: {},  // Optionally delete existing payments (if needed)
                    create: payment.map((p) => ({
                        amount: p.amount,
                        date: p.date,
                        dueDate: p.dueDate,
                        paymentStatus: p.paymentStatus,
                    })),
                },
            },
            include: {
                profile: true,
                payments: true,
            },
        });

        // Return the updated member as a domain model
        return Member.from(updatedMemberPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllMembers,
    createMember,
    getMemberById,
    updateMember,
};
