// index.ts
type Role = 'member' | 'trainees' | 'admin';

type MemberInput = {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    profile: ProfileInput; // Linking to ProfileInput
};

type ProfileInput = {
    name: string;
    surname: string;
    height: number;
    weight: number;
};

type MemberShipInput = {
    memberId?: number;
    startDate: Date;
    endDate: Date;
    role: Role;
};
type UpdateMMembershipInput = {
    memberid?: number;
    startDate: Date;
    endDate: Date;
    membershipType?: string;
};

export { MemberInput, ProfileInput, Role, MemberShipInput };
