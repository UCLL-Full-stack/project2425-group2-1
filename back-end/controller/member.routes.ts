import express, { NextFunction, Request, Response } from 'express';
import memberService from '../service/member.service'; // Ensure the correct path to services
import { MemberInput } from '../types'; // Ensure the correct path to types

const memberRouter = express.Router();



memberRouter.get('/username', async (req: Request, res: Response) => {
    const { username } = req.params; // Get username from the request parameters

    try {
        const member = await memberService.getMemberByUsername({ username }); // Call service method to fetch user by username
        if (!member) {
            return res.status(404).json({ message: `Member with username ${username} not found.` });
        }
        return res.status(200).json(member); // Return the member data if found
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching member by username.' });
    }
});


memberRouter.post('/login', async (req: Request, res: Response,next : NextFunction) => {
   try {
    const UserInput =  <MemberInput>req.body;
    const response = await memberService.authentication(UserInput);
    res.status(200).json({message : "Authentication Successfull", ...response});
   } catch (error) {
    next(error);
   }});

   // Create a new member
memberRouter.post('/signup', async (req: Request, res: Response) => {
    const memberData = <MemberInput>req.body;

    try {
        const newMember = await memberService.createMember(memberData);
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ error: 'Error during member creation.' });
    }
});




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
