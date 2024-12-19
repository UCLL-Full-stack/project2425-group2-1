// index.ts
type Role = 'member' | 'trainees' | 'admin';

type MemberInput = {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    profile: ProfileInput; // Linking to ProfileInput
    membership: MembershipInput; // Linking to MembershipInput
    payment: PaymentInput[]; // Linking to PaymentInput
    attendance?: AttendanceInput[]; // Linking to AttendanceInput
};

type MembershipInput = {
    startDate: Date;
    endDate: Date;
    type: string;
};
type ProfileInput = {
    name: string;
    surname: string;
    height: number;
    weight: number;
};
type PaymentInput = {
    amount: number;
    date: Date;
    dueDate: Date;
    paymentStatus: boolean;
};

type AttendanceInput = {
    id : number;
    attendance_tracking: boolean;
    trainerId: number;
};

type TrainerInput = {
    name: string;
    language_spoken: string;
    availability: boolean;
    attendances: AttendanceInput[]; // Linking to AttendanceInput
    
};

export { MemberInput, ProfileInput, PaymentInput, MembershipInput, AttendanceInput, TrainerInput };
