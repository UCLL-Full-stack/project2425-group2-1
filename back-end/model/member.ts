import {
    Member as MemberPrisma,
    Payment as PaymentPrisma,
    Profile as ProfilePrisma,
} from '@prisma/client';

import { Payment } from './payment';
import { Profile } from './profile';

export class Member {
    public id?: number; // Optional id
    public username: string;
    public email: string;
    public phoneNumber: string;
    public password: string;
    public profile?: Profile;
    public payment: Payment[]; // Use singular form

    // Constructor to initialize the Member object
    constructor({
        id,
        username,
        email,
        phoneNumber,
        password,
        profile,
        payment = [],
    }: {
        id?: number;
        username: string;
        email: string;
        phoneNumber: string;
        password: string;
        profile: Profile;
        payment?: Payment[]; // Use singular form
    }) {
        //   if (!this.validatePhoneNumber(phoneNumber)) {
        //       throw new Error("Invalid phone number format. It should start with +32 or 04 and have 10 digits.");
        //   }

        //   if (!this.validatePassword(password)) {
        //     throw new Error("Password must contain at least 8 characters, including an uppercase letter, lowercase letter, symbol (@#$), and a number.");
        // }

        this.id = id;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.profile = profile;
        this.payment = payment; // Initialize payment
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

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    getPassword(): string {
        return this.password;
    }

    getProfile(): Profile | undefined {
        return this.profile;
    }

    addPayment(payment: Payment): void {
        this.payment.push(payment);
    }

    getPayments(): Payment[] {
        return this.payment;
    }

    equals(member: Member): boolean {
        return (
            this.username === member.getUsername() &&
            this.email === member.getEmail() &&
            this.phoneNumber === member.getPhoneNumber()
        );
    }

    // private validatePhoneNumber(phoneNumber: string): boolean {
    //   const phoneRegex = /^(?:\+32|04)\d{8}$/;
    //   return phoneRegex.test(phoneNumber);
    // }

    // private validatePassword(password: string): boolean {
    //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!&+=])[A-Za-z\d@#$%^&*!&+=]{8,}$/;
    //   return passwordRegex.test(password);
    // }

    // static from({
    //   id,
    //   username,
    //   email,
    //   phoneNumber,
    //   password,
    //   profile,
    //   payment
    // }: MemberPrisma & { profile: ProfilePrisma } & { payment: PaymentPrisma[] }): Member {
    //   return new Member({
    //     id,
    //     username,
    //     email,
    //     phoneNumber,
    //     password,
    //     profile: Profile.from(profile),
    //     payment: payment.map(p => Payment.from(p)),
    //   });

    // public static from(memberPrisma: any): Member {
    //     return new Member({
    //         id: memberPrisma.id,
    //         username: memberPrisma.username,
    //         email: memberPrisma.email,
    //         phoneNumber: memberPrisma.phoneNumber,
    //         password: memberPrisma.password,
    //         profile: memberPrisma.profile,
    //         payment: memberPrisma.payments, // Ensure this matches the expected structure
    //     });
    // }

    public static from(memberPrisma: MemberPrisma & { profile: ProfilePrisma; payments: PaymentPrisma[] }): Member {
        // Map Profile and Payments to their respective classes
        const profileInstance = Profile.from(memberPrisma.profile);
        const paymentsInstance = memberPrisma.payments.map((payment) => Payment.from(payment));

        return new Member({
            id: memberPrisma.id,
            username: memberPrisma.username,
            email: memberPrisma.email,
            phoneNumber: memberPrisma.phoneNumber,
            password: memberPrisma.password,
            profile: profileInstance,
            payment: paymentsInstance,
        });
    }
}
