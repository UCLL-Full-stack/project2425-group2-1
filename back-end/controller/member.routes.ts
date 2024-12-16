import express, { NextFunction, Request, Response } from 'express';
import memberService from '../service/member.service';
import { Member } from '../model/member';
import memberDb from '../repository/member.db';
import { Profile } from '../model/profile'; // Adjust the import path as necessary
import paymentService from '../service/payment.service';

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
 *         username: john_doe
 *         email: johndoe@example.com
 *         phoneNumber: "0475829054"
 *         password: "SecurePassword@1"
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The auto-generated ID of the profile
 *         name:
 *           type: string
 *           description: The member's name
 *         surname:
 *           type: string
 *           description: The member's surname
 *         height:
 *           type: number
 *           description: The member's height in cm
 *         weight:
 *           type: number
 *           description: The member's weight in kg
 *       example:
 *         id: 1
 *         name: John
 *         surname: Doe
 *         height: 180
 *         weight: 75
 *     Payment:
 *       type: object
 *       properties:
 *         member:
 *           type: string
 *           description: Username of the member
 *         totalPaid:
 *           type: number
 *           description: Total amount paid by the member
 *         status:
 *           type: string
 *           description: Current payment status (e.g., Paid, Pending)
 *         overdueCount:
 *           type: number
 *           description: Number of overdue payments
 *       example:
 *         member: john_doe
 *         totalPaid: 500
 *         status: Paid
 *         overdueCount: 2
 */

// GET all members
memberRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const members = await memberService.getAllMembers();
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
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *               profile:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   surname:
 *                     type: string
 *     responses:
 *       201:
 *         description: Member registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *       400:
 *         description: Bad request
 *       405:
 *         description: Method not allowed
 */
memberRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, email, phoneNumber, password, profile } = req.body;
        const newMember = new Member({
            username,
            email,
            phoneNumber,
            password,
            profile: new Profile(profile),
        });

        const memberId = await memberService.registerMember(newMember);
        res.status(201).json({ id: memberId });
    } catch (error) {
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
memberRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const member = await memberService.getMemberById(id);
        if (!member) {
            return res.status(404).json({ error: `Member with id ${id} does not exist.` });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

/**
 * @swagger
 * /members/{id}/profile:
 *   put:
 *     summary: Update member profile
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the member to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 profile:
 *                   $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Member not found
 */

memberRouter.put(
    '/members/:id/profile',
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(`Received request to update profile for member ID: ${req.params.id}`);
        console.log('Request body:', req.body); // Log the request body for verification
        try {
            const { id } = req.params;
            const profileUpdates = req.body;
            const updatedMember = await memberService.updateProfile(Number(id), profileUpdates);

            if (updatedMember) {
                res.status(200).json({
                    message: 'Profile updated successfully',
                    profile: updatedMember.getProfile(),
                });
            } else {
                res.status(404).json({ error: 'Member not found' });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

/**
 * @swagger
 * /members/payments/status:
 *   get:
 *     summary: Get payment status for all members
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Payment status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */
memberRouter.get('/payments/status', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paymentStatus = await paymentService.getPaymentStatus();
        res.status(200).json(paymentStatus);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /members/payments/report:
 *   get:
 *     summary: Generate a financial report for all members
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Financial report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   member:
 *                     type: string
 *                     description: Username of the member
 *                   totalPaid:
 *                     type: number
 *                     description: Total amount paid by the member
 *                   totalPayments:
 *                     type: number
 *                     description: Total number of payments made by the member
 *                   totalOverdue:
 *                     type: number
 *                     description: Total number of overdue payments
 */
memberRouter.get('/payments/report', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const report = await paymentService.generateFinancialReport();
        res.status(200).json(report);
    } catch (error) {
        next(error);
    }
});

export { memberRouter };
