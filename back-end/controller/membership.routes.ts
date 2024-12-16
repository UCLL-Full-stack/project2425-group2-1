import express, { Request, Response, NextFunction } from 'express';
import membershipService from '../service/membership.service';
import { MemberShipInput } from '../types/index';
import { Membership } from '../model/membership';

const membershipRouter = express.Router();

/**
 * @swagger
 * /memberships:
 *   get:
 *     summary: Get all memberships
 *     tags: [Memberships]
 *     responses:
 *       200:
 *         description: A list of memberships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       500:
 *         description: Internal Server Error
 */
membershipRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const memberships = await membershipService.getAllMemberships();
        res.status(200).json(memberships);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /memberships/{id}:
 *   get:
 *     summary: Get a membership by ID
 *     tags: [Memberships]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The membership ID
 *     responses:
 *       200:
 *         description: A single membership
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       404:
 *         description: Membership not found
 *       500:
 *         description: Internal Server Error
 */
membershipRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const membership = await membershipService.getMembershipById(id);
        res.status(200).json(membership);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /memberships:
 *   post:
 *     summary: Create a new membership
 *     tags: [Memberships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberShipInput'
 *     responses:
 *       201:
 *         description: Membership created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
membershipRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const memberShipInput: MemberShipInput = req.body;
        const newMembership = new Membership({
            start_date: memberShipInput.startDate,
            end_date: memberShipInput.endDate,
            membership_type: memberShipInput.role,
            memberId: memberShipInput.memberId,
        });
        const createdMembership = await membershipService.createMembership(newMembership);
        res.status(201).json(createdMembership);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /memberships/{id}:
 *   put:
 *     summary: Update a membership
 *     tags: [Memberships]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The membership ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberShipInput'
 *     responses:
 *       200:
 *         description: Membership updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       404:
 *         description: Membership not found
 *       500:
 *         description: Internal Server Error
 */
membershipRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const memberShipInput: MemberShipInput = req.body;
        const updatedMembership = new Membership({
            id,
            start_date: memberShipInput.startDate,
            end_date: memberShipInput.endDate,
            membership_type: memberShipInput.role,
            memberId: memberShipInput.memberId,
        });
        const membership = await membershipService.updateMembership(updatedMembership);
        res.status(200).json(membership);
    } catch (error) {
        next(error);
    }
});

export{ membershipRouter};
