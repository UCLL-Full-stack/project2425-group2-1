import express, { Request, Response } from 'express';
import paymentService from '../service/payment.service'; // Adjust path as needed
import { PaymentInput } from '../types'; // Ensure the correct path to types

const paymentRouter = express.Router();

// Get all payments
paymentRouter.get('/', async (req: Request, res: Response) => {
    try {
        const payments = await paymentService.getAllPayments();
        res.json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

// Create a new payment for a member
paymentRouter.post('/:memberId', async (req: Request, res: Response) => {
    const memberId = parseInt(req.params.memberId);
    const paymentData: PaymentInput = req.body;

    try {
        const newPayment = await paymentService.createPayment(paymentData, memberId);
        res.status(201).json(newPayment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

// Get payments by member ID
paymentRouter.get('/member/:memberId', async (req: Request, res: Response) => {
    const memberId = parseInt(req.params.memberId);

    try {
        const payments = await paymentService.getPaymentsByMemberId(memberId);
        res.json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

export { paymentRouter };
