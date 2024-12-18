import database from '../util/database';
import { Membership } from '../model/membership';
import { MembershipInput } from '../types';

// Fetch all memberships
const getAllMemberships = async (): Promise<Membership[]> => {
    try {
        const membershipsPrisma = await database.membership.findMany({
            include: {
                member: true,
            },
        });
        return membershipsPrisma.map((membershipPrisma) => Membership.from(membershipPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Fetch a membership by ID
const getMembershipById = async (id: number): Promise<Membership | null> => {
    try {
        const membershipPrisma = await database.membership.findUnique({
            where: { id },
            include: {
                member: true,
            },
        });
        return membershipPrisma ? Membership.from(membershipPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Create a new membership
const createMembership = async (membershipData: MembershipInput): Promise<Membership> => {
    const { startDate, endDate, type, } = membershipData;

    try {
        const membershipPrisma = await database.membership.create({
            data: {
                startDate,
                endDate,
                type
            },
            include: {
                member: true,
            },
        });
        return Membership.from(membershipPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Update a membership
const updateMembership = async (id: number, membershipData: MembershipInput): Promise<Membership> => {
    const { startDate, endDate, type } = membershipData;

    try {
        const updatedMembershipPrisma = await database.membership.update({
            where: { id },
            data: {
                startDate,
                endDate,
                type
            },
            include: {
                member: true,
            },
        });
        return Membership.from(updatedMembershipPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllMemberships,
    getMembershipById,
    createMembership,
    updateMembership,
};
