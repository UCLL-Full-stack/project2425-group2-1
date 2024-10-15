export class Membership {
    private id?: number;
    private start_date: Date;
    private end_date: Date;
    private type: string;

    constructor(membership: { start_date: Date, end_date: Date, type: string }) {
        this.start_date = membership.start_date;
        this.end_date = membership.end_date;
        this.type = membership.type; //. The value of type could be something like "Monthly", "Quarterly", "Yearly", or any other custom membership type the gym offers (e.g., "Student", "Family", "VIP").
    }

    // Getters for accessing private properties
    getId(): number | undefined {
        return this.id;
    }

     getStartDate(): Date {
        return this.start_date;
    }

     getEndDate(): Date {
        return this.end_date;
    }

     getType(): string {
        return this.type;
    }

    // Equals method to compare two Membership objects
     equals(membership: Membership): boolean {
        return (
            this.start_date.getTime() === membership.getStartDate().getTime() &&
            this.end_date.getTime() === membership.getEndDate().getTime() &&
            this.type === membership.getType()
        );
    }
}
