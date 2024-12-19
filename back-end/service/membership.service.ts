import membershipDB from '../repository/membership.db'; // Importing the membership database functions
import { Membership } from '../model/membership'; // Importing the Membership model
import { MembershipInput } from '../types';

// Service method to fetch all memberships
const getAllMemberships = async (): Promise<Membership[]> => {
    try {
        return await membershipDB.getAllMemberships(); // Call the getAllMemberships function from membershipDB
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching all memberships.');
    }
};

// Service method to fetch a membership by its ID
const getMembershipById = async (id: number): Promise<Membership> => {
    try {
        const membership = await membershipDB.getMembershipById(id); // Call the getMembershipById function from membershipDB
        if (!membership) {
            throw new Error(`Membership with id ${id} does not exist.`); // Error if membership not found
        }
        return membership;
    } catch (error) {
        console.error(error);
        throw new Error(`Error fetching membership with id ${id}.`);
    }
};

// Service method to create a new membership
const createMembership = async (membershipData: MembershipInput): Promise<Membership> => {
    try {
        return await membershipDB.createMembership(membershipData); // Call the createMembership function from membershipDB
    } catch (error) {
        console.error(error);
        throw new Error('Error creating new membership.');
    }
};

// Service method to update a membership
const updateMembership = async (id: number, membershipData: MembershipInput): Promise<Membership> => {
    try {
        const updatedMembership = await membershipDB.updateMembership(id, membershipData); // Call the updateMembership function from membershipDB
        if (!updatedMembership) {
            throw new Error(`Membership with id ${id} could not be updated.`); // Error if membership update failed
        }
        return updatedMembership;
    } catch (error) {
        console.error(error);
        throw new Error(`Error updating membership with id ${id}.`);
    }
};


// Service method to renew a membership
const renewMembership = async (id: number): Promise<Membership> => {
    try {
        const renewedMembership = await membershipDB.renewMembership(id); // Call the renewMembership function from membershipDB
        if (!renewedMembership) {
            throw new Error(`Membership with id ${id} could not be renewed.`); // Error if renewal fails
        }
        return renewedMembership;
    } catch (error) {
        console.error(error);
        throw new Error(`Error renewing membership with id ${id}.`);
    }
};

export default {
    getAllMemberships,
    getMembershipById,
    createMembership,
    updateMembership,
    renewMembership,
};
