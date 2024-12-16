import { Membership } from '../model/membership';
import membershipRepository from '../repository/membership.db';

// Function to get all memberships
const getAllMemberships = async (): Promise<Membership[]> => {
    return await membershipRepository.getAllMemberships();
};

// Function to get a membership by ID
const getMembershipById = async (id: number): Promise<Membership> => {
    const membership = await membershipRepository.getMembershipById(id);
    if (!membership) {
        throw new Error(`Membership with id ${id} does not exist.`);
    }
    return membership;
};

// Function to create a new membership
const createMembership = async (newMembership: Membership): Promise<Membership> => {
    return await membershipRepository.createMembership(newMembership);
};

// Function to update a membership
const updateMembership = async (updatedMembership: Membership): Promise<Membership> => {
    return await membershipRepository.updateMembership(updatedMembership);
};

// Exporting functions for use in other modules
export default {
    getAllMemberships,
    getMembershipById,
    createMembership,
    updateMembership,
};
