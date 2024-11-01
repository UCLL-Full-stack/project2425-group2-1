// index.ts

 type MemberInput = {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    profile: ProfileInput; // Linking to ProfileInput
}

 type ProfileInput = {
    name: string;
    surname: string;
    height: number;
    weight: number;
}

export {
    MemberInput,
    ProfileInput
}