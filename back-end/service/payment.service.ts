import paymentDB from '../repository/payment.db';  // Importing the payment database functions
import { Payment } from '../model/payment';  // Importing the Payment model
import { PaymentInput } from '../types';  // Importing the PaymentInput type

// Service method to fetch all payments
const getAllPayments = async (): Promise<Payment[]> => {
    try {
        return await paymentDB.getAllPayments();  // Call the getAllPayments function from paymentDB
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching all payments.');
    }
};

// Service method to fetch payments by member ID
const getPaymentsByMemberId = async (memberId: number): Promise<Payment[]> => {
    try {
        return await paymentDB.getPaymentsByMemberId({ memberId });  // Call the getPaymentsByMemberId function from paymentDB
    } catch (error) {
        console.error(error);
        throw new Error(`Error fetching payments for member with id ${memberId}.`);
    }
};

// Service method to create a new payment
const createPayment = async (paymentData: PaymentInput, memberId: number): Promise<Payment> => {
    try {
        return await paymentDB.createPayment(paymentData, memberId);  // Call the createPayment function from paymentDB
    } catch (error) {
        console.error(error);
        throw new Error('Error creating new payment.');
    }
};

export default {
    getAllPayments,
    getPaymentsByMemberId,
    createPayment,
};
