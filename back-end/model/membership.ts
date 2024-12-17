import { Membership as MembershipPrisma } from '@prisma/client';

export class Membership {
    private id?: number; // Optional id
    private start_date: Date;
    private end_date: Date;
    private membership_type: string;
    private memberId?: number; // Optional memberId

    // Constructor to initialize the Membership object
    constructor({
        id,
        start_date,
        end_date,
        membership_type,
        memberId,
    }: {
        id?: number;
        start_date: Date;
        end_date: Date;
        membership_type: string;
        memberId?: number;
    }) {
        if (!this.validateDates(start_date, end_date)) {
            throw new Error('End date must be after the start date.');
        }

        this.id = id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.membership_type = membership_type;
        this.memberId = memberId;
    }

    getId(): number | undefined {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getStartDate(): Date {
        return this.start_date;
    }

    getEndDate(): Date {
        return this.end_date;
    }

    getMembershipType(): string {
        return this.membership_type;
    }

    getMemberId(): number | undefined {
        return this.memberId;
    }

    setMemberId(memberId: number): void {
        this.memberId = memberId;
    }

    private validateDates(start_date: Date, end_date: Date): boolean {
        return start_date < end_date;
    }

    static from({
        id,
        start_date,
        end_date,
        membership_type,
        memberId,
    }: MembershipPrisma): Membership {
        return new Membership({
            id,
            start_date,
            end_date,
            membership_type,
            memberId: memberId ?? undefined,
        });
    }
}
