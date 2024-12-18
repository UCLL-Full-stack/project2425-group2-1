// index.ts
type Role = 'member' | 'trainees' | 'admin'

 type MemberInput = {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    profile: ProfileInput; // Linking to ProfileInput
    payment: PaymentInput[]; // Linking to PaymentInput
}

 type ProfileInput = {
    name: string;
    surname: string;
    height: number;
    weight: number;
}
type PaymentInput = {
    amount: number;
    date: Date;
    dueDate: Date;
    paymentStatus: boolean;
}

export {
    MemberInput,
    ProfileInput,
    PaymentInput,
}