import express, { NextFunction, Request, Response } from 'express';
import MemberService from '../service/member.service';
import { Member } from '../model/member';
import memberDb from '../repository/member.db';
import memberService from '../service/member.service';

const memberRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The auto-generated ID of the member
 *         name:
 *           type: string
 *           description: The first name of the member
 *         surname:
 *           type: string
 *           description: The last name of the member
 *         username:
 *           type: string
 *           description: Unique username for the member
 *         email:
 *           type: string
 *           description: Member's email address
 *         phoneNumber:
 *           type: string
 *           description: Member's phone number (must start with +32 or 04)
 *         password:
 *           type: string
 *           description: Member's password (with validation rules)
 *       example:
 *         id: 1
 *         name: John
 *         surname: Doe
 *         username: john_doe
 *         email: johndoe@example.com
 *         phoneNumber: "0475829054"
 *         password: "SecurePassword@1"
 */
memberRouter.get("/", async (req: Request, res: Response, next:NextFunction) => {
    try {
        const members = memberService.getAllMembers();
        res.status(200).json(members);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /members/register:
 *   post:
 *     summary: Register a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Member registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         description: Invalid input or username already exists
 *     security:
 *       - bearerAuth: []
 */
memberRouter.post('/register', (req: Request, res: Response) => {
    try {
        const newMember = new Member(req.body);
        MemberService.registerMember(newMember);
        res.status(201).json(newMember);
    } catch (error) {
        // Casting error to Error to access the message property
        res.status(400).json({ error: (error as Error).message });
    }
});

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Get member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The member ID
 *     responses:
 *       200:
 *         description: Member found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 */
memberRouter.get('/:id', (req: Request, res: Response) => {
    const member = memberDb.getMemberById({ id: parseInt(req.params.id, 10) });
    if (member) {
        res.status(200).json(member);
    } else {
        res.status(404).json({ error: "Member not found" });
    }
});

export { memberRouter };
