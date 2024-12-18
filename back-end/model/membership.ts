import { Membership as MembershipPrisma } from '@prisma/client';

export class Membership {
    public id?: number;
    public startDate: Date;
    public endDate: Date;
    public type: string; // e.g. 'monthly', 'yearly'

    constructor({
        id,
        startDate,
        endDate,
        type,
    }: {
        id?: number;
        startDate: Date;
        endDate: Date;
        type: string;
    }) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.type = type;
    }

    getId(): number | undefined {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    setStartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }

    setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    getType(): string {
        return this.type;
    }

    setType(type: string): void {
        this.type = type;
    }

    static from(membershipPrisma: MembershipPrisma): Membership {
        return new Membership({
            id: membershipPrisma.id,
            startDate: membershipPrisma.startDate,
            endDate: membershipPrisma.endDate,
            type: membershipPrisma.type,
        });
    }
}
