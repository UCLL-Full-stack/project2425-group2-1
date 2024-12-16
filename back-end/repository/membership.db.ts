import { PrismaClient } from '@prisma/client';
import { Membership } from '../model/membership';

const prisma = new PrismaClient();

// Function to get all memberships
const getAllMemberships = async (): Promise<Membership[]> => {
    const memberships = await prisma.membership.findMany();
    return memberships.map(mapToMembership);
};

// Function to get a membership by ID
const getMembershipById = async (id: number): Promise<Membership | null> => {
    const membership = await prisma.membership.findUnique({
        where: { id },
    });
    return membership ? mapToMembership(membership) : null;
};

// Function to create a new membership
const createMembership = async (newMembership: Membership): Promise<Membership> => {
    const createdMembership = await prisma.membership.create({
        data: {
            start_date: newMembership.getStartDate(),
            end_date: newMembership.getEndDate(),
            membership_type: newMembership.getMembershipType(),
            memberId: newMembership.getMemberId(),
        },
    });
    return mapToMembership(createdMembership);
};

// Function to update a membership
const updateMembership = async (updatedMembership: Membership): Promise<Membership> => {
    const updated = await prisma.membership.update({
        where: { id: updatedMembership.getId() },
        data: {
            start_date: updatedMembership.getStartDate(),
            end_date: updatedMembership.getEndDate(),
            membership_type: updatedMembership.getMembershipType(),
            memberId: updatedMembership.getMemberId(),
        },
    });
    return mapToMembership(updated);
};

// Helper function to map Prisma membership to Membership model
const mapToMembership = (membership: any): Membership => {
    return new Membership({
        id: membership.id,
        start_date: membership.start_date,
        end_date: membership.end_date,
        membership_type: membership.membership_type,
        memberId: membership.memberId,
    });
};

// Exporting functions for use in other modules
export default {
    getAllMemberships,
    getMembershipById,
    createMembership,
    updateMembership,
};
