import database from '../util/database';
import { Payment } from '../model/payment';
import { PaymentInput } from '../types';

const getAllPayments = async (): Promise<Payment[]> => {
    try {
        const paymentsPrisma = await database.payment.findMany();
        return paymentsPrisma.map((paymentPrisma) => Payment.from(paymentPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createPayment = async (paymentData: PaymentInput, memberId: number): Promise<Payment> => {
    const { amount, date, dueDate, paymentStatus } =    paymentData;

    try {
        const paymentPrisma = await database.payment.create({
            data: {
                amount,
                date,
                dueDate,
                paymentStatus,
                member: {
                    connect: { id: memberId }, // Connect to an existing member using the memberId
                },
            },
        });

        return Payment.from(paymentPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const getPaymentsByMemberId = async ({ memberId }: { memberId: number }): Promise<Payment[]> => {
    try {
        const paymentsPrisma = await database.payment.findMany({
            where: { memberId },
        });

        return paymentsPrisma.map((paymentPrisma) => Payment.from(paymentPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllPayments,
    createPayment,
    getPaymentsByMemberId,
};
