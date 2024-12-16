import { Payment as PaymentPrisma } from '@prisma/client';

export class Payment {
    public id?: number;
    public amount: number;
    public date: Date;
    public dueDate: Date;
    public paymentStatus: boolean;

    constructor({
        id,
        amount,
        date,
        dueDate,
        paymentStatus,
    }: {
        id?: number;
        amount: number;
        date: Date;
        dueDate: Date;
        paymentStatus: boolean;
    }) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.dueDate = dueDate;
        this.paymentStatus = paymentStatus;
    }

    getId(): number | undefined {
        return this.id;
    }

    getAmount(): number {
        return this.amount;
    }

    getDate(): Date {
        return this.date;
    }

    getDueDate(): Date {
        return this.dueDate;
    }

    getPaymentStatus(): boolean {
        return this.paymentStatus;
    }

    isOverdue(): boolean {
        return !this.paymentStatus && new Date() > this.dueDate;
    }

    equals(payment: Payment): boolean {
        return (
            this.amount === payment.getAmount() &&
            this.date.getTime() === payment.getDate().getTime() &&
            this.dueDate.getTime() === payment.getDueDate().getTime() &&
            this.paymentStatus === payment.getPaymentStatus()
        );
    }

    static from({
        id,
        amount,
        date,
        dueDate,
        paymentStatus,
    }: PaymentPrisma): Payment {
        return new Payment({
            id,
            amount,
            date,
            dueDate,
            paymentStatus,
        });
    }
}
