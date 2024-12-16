import { Member } from '../model/member';
import { Payment } from '../model/payment';
import { Profile } from '../model/profile';
import memberRepository from '../repository/member.db';

// Function to get payment status for all members
const getPaymentStatus = async (): Promise<any[]> => {
    const members = await memberRepository.getAllMembers();
    return members.map(member => {
        const payments = member.getPayments();
        const totalPaid = payments.reduce((sum, payment) => sum + payment.getAmount(), 0);
        const overdueCount = payments.filter(payment => isPaymentOverdue(payment)).length;
        const paymentStatus = payments.some(payment => !payment.getPaymentStatus()) ? 'Pending' : 'Paid';

        return {
            member: member.getUsername(),
            totalPaid,
            status: paymentStatus,
            overdueCount
        };
    });
};

// Function to generate a financial report
const generateFinancialReport = async (): Promise<any[]> => {
    const members = await memberRepository.getAllMembers();
    return members.map(member => {
        const payments = member.getPayments();
        const totalPaid = payments.reduce((sum, payment) => sum + payment.getAmount(), 0);
        const totalPayments = payments.length;
        const totalOverdue = payments.filter(payment => isPaymentOverdue(payment)).length;

        return {
            member: member.getUsername(),
            totalPaid,
            totalPayments,
            totalOverdue
        };
    });
};

// Private function to check if a payment is overdue
const isPaymentOverdue = (payment: Payment): boolean => {
    const currentDate = new Date();
    const paymentDate = payment.getDueDate();
    return !payment.getPaymentStatus() && paymentDate < currentDate;
};

// Exporting functions for use in other modules
export default {
    getPaymentStatus,
    generateFinancialReport,
};
