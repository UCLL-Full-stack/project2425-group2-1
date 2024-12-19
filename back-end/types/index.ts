// index.ts
type Role = 'member' | 'trainees' | 'admin';

type MemberInput = {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: Role; // MChanged
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
    firstname: string;
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
    id: number;
    attendance_tracking: boolean;
    trainerId: number;
};

type TrainerInput = {
    name: string;
    language_spoken: string;
    password: string;
    availability: boolean;
    attendances: AttendanceInput[]; // Linking to AttendanceInput
};

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
};

export {
    MemberInput,
    ProfileInput,
    PaymentInput,
    MembershipInput,
    AttendanceInput,
    TrainerInput,
    AuthenticationResponse,
    Role,
};
