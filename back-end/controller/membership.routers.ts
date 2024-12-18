import express, { Request, Response } from 'express';
import membershipService from '../service/membership.service'; // Ensure the correct path to services
import { MembershipInput } from '../types'; // Ensure the correct path to types

const membershiphRouter = express.Router();

// Get all memberships
membershiphRouter.get('/', async (req: Request, res: Response) => {
    try {
        const memberships = await membershipService.getAllMemberships();
        res.json(memberships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

// Get a membership by ID
membershiphRouter.get('/:id', async (req: Request, res: Response) => {
    const membershipId = parseInt(req.params.id);

    try {
        const membership = await membershipService.getMembershipById(membershipId);
        if (membership) {
            res.json(membership);
        } else {
            res.status(404).json({ error: 'Membership not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

// Create a new membership
membershiphRouter.post('/', async (req: Request, res: Response) => {
    const membershipData: MembershipInput = req.body;

    try {
        const newMembership = await membershipService.createMembership(membershipData);
        res.status(201).json(newMembership);
    } catch (error) {
        console.error('Error during membership creation:', error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

// Update a membership
membershiphRouter.put('/:id', async (req: Request, res: Response) => {
    const membershipId = parseInt(req.params.id);
    const membershipData: MembershipInput = req.body;

    try {
        const updatedMembership = await membershipService.updateMembership(membershipId, membershipData);
        res.json(updatedMembership);
    } catch (error) {
        console.error('Error during membership update:', error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

export { membershiphRouter };
