import {
    Member as MemberPrisma,
    Payment as PaymentPrisma,
    Profile as ProfilePrisma,
    Membership as MembershipPrisma,
    Attendance as AttendancePrisma,
} from '@prisma/client';

import { Payment } from './payment';
import { Profile } from './profile';
import { Membership } from './membership';
import { Attendance } from './attendance';
import { Role } from '../types';

export class Member {
    public id?: number; // Optional id
    public username: string;
    public email: string;
    public phoneNumber: string;
    public password: string;
    public role: Role; // MChanged
    public profile?: Profile;
    public payment: Payment[]; // Use singular form
    public membership?: Membership;
    // Constructor to initialize the Member object
    public attendance?: Attendance[];
    constructor({
        id,
        username,
        email,
        phoneNumber,
        password,
        role,
        profile,
        payment = [],
        membership,
        attendance = [],
    }: {
        id?: number;
        username: string;
        email: string;
        phoneNumber: string;
        password: string;
        role: Role; // MChanged
        profile: Profile;
        payment?: Payment[];
        membership: Membership; // Use singular form
        attendance?: Attendance[];
    }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
        this.profile = profile;
        this.payment = payment; // Initialize payment
        this.membership = membership;
        this.attendance = attendance;
    }

    getId(): number | undefined {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getRole(): Role | undefined {
        return this.role;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    getPassword(): string {
        return this.password;
    }

    getProfile(): Profile | undefined {
        return this.profile;
    }

    getMembership(): Membership | undefined {
        return this.membership;
    }

    addPayment(payment: Payment): void {
        this.payment.push(payment);
    }

    getPayments(): Payment[] {
        return this.payment;
    }

    getAttendance(): Attendance[] {
        return this.attendance || [];
    }

    equals(member: Member): boolean {
        return (
            this.username === member.getUsername() &&
            this.email === member.getEmail() &&
            this.phoneNumber === member.getPhoneNumber() &&
            this.role === member.getRole()
        );
    }

    static validatePhoneNumber(phoneNumber: string): boolean {
        const phoneRegex = /^(?:\+32|04)\d{8}$/;
        return phoneRegex.test(phoneNumber);
    }

    static validatePassword(password: string): boolean {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!&+=])[A-Za-z\d@#$%^&*!&+=]{8,}$/;
        return passwordRegex.test(password);
    }

    public static from({
        id,
        username,
        email,
        phoneNumber,
        password,
        profile,
        payments,
        membership,
        attendance,
        role,
    }: MemberPrisma & {
        profile: ProfilePrisma;
        payments: PaymentPrisma[];
        membership: MembershipPrisma;
        attendance: AttendancePrisma[];
        role: string; // MChanged Fix to error: Type 'string' is not assignable to type 'Role'.
    }): Member {
        return new Member({
            id,
            username,
            email,
            phoneNumber,
            password,
            role: role as Role, // Translation from string in the database (memberPrisma) to the role in domain model.
            profile: Profile.from(profile),
            payment: payments.map((payment) => Payment.from(payment)),
            membership: Membership.from(membership),
            attendance: attendance.map((att) => Attendance.from(att)),
        });
    }
}
