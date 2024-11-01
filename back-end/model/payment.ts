export class Payment {
    private id?: number;                // Optional id
    private amount: number;             // Amount paid
    private date: Date;                 // Payment date
    private dueDate: Date;              // Due date for the payment
    private paymentStatus: boolean;      // Payment status (true if paid, false if pending)

    // Constructor to initialize the Payment object
    constructor(payment: { 
        amount: number, 
        date: Date, 
        dueDate: Date, 
        paymentStatus: boolean 
    }) {
        this.amount = payment.amount;
        this.date = payment.date;
        this.dueDate = payment.dueDate;
        this.paymentStatus = payment.paymentStatus;
    }

    // Getter methods for accessing private properties
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

    // Method to check if payment is overdue
    isOverdue(): boolean {
        // A payment is overdue if it's not paid and the due date has passed
        return !this.paymentStatus && new Date() > this.dueDate;
    }

    // Equals method to compare two Payment objects
    equals(payment: Payment): boolean {
        return (
            this.amount === payment.getAmount() &&
            this.date.getTime() === payment.getDate().getTime() &&
            this.dueDate.getTime() === payment.getDueDate().getTime() &&
            this.paymentStatus === payment.getPaymentStatus()
        );
    }
}
