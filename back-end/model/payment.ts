export class Payment {
    private id?: number;        // Optional id
    private amount: number;     // Amount paid
    private date: Date;         // Payment date
    private paymentStatus: boolean;  // Payment status (true if paid, false if pending)

    // Constructor to initialize the Payment object
    constructor(payment: { amount: number, date: Date, paymentStatus: boolean }) {
        this.amount = payment.amount;
        this.date = payment.date;
        this.paymentStatus = payment.paymentStatus;
       
    }

    // Getter methods for accessing private properties

    // Get the id (optional)
     getId(): number | undefined {
        return this.id;
    }

    // Get the amount paid
     getAmount(): number {
        return this.amount;
    }

    // Get the date of payment
     getDate(): Date {
        return this.date;
    }

    // Get the payment status (true if paid, false if pending)
     getPaymentStatus(): boolean {
        return this.paymentStatus;
    }

    // Equals method to compare two Payment objects
     equals(payment: Payment): boolean {
        return (
            this.amount === payment.getAmount() &&
            this.date.getTime() === payment.getDate().getTime() &&
            this.paymentStatus === payment.getPaymentStatus()
        );
    }
}
