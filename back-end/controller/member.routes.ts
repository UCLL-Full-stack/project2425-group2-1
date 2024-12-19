import express, { Request, Response } from 'express';
import memberService from '../service/member.service'; // Ensure the correct path to services
import { MemberInput } from '../types'; // Ensure the correct path to types

const memberRouter = express.Router();

// Get all members
memberRouter.get('/', async (req: Request, res: Response) => {
    try {
        const members = await memberService.getAllMembers();
        res.json(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

// Create a new member
memberRouter.post('/', async (req: Request, res: Response) => {
    const memberData: MemberInput = req.body;

    try {
        const newMember = await memberService.createMember(memberData);
        res.status(201).json(newMember);
    } catch (error) {
        console.error('Error during member creation:', error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

// Get member by ID
memberRouter.get('/:id', async (req: Request, res: Response) => {
    const memberId = parseInt(req.params.id);

    try {
        const member = await memberService.getMemberById(memberId);
        if (member) {
            res.json(member);
        } else {
            res.status(404).json({ error: 'Member not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

memberRouter.put('/:id', async (req: Request, res: Response) => {
    const memberId = parseInt(req.params.id);
    const memberData: MemberInput = req.body;

    try {
        const updatedMember = await memberService.updateMember(memberId, memberData);
        res.json(updatedMember);
    } catch (error) {
        console.error('Error during member update:', error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

export { memberRouter };
