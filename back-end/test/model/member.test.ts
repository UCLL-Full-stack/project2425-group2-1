import { Member } from '../../model/member';
import { Payment } from '../../model/payment';
import { Profile } from '../../model/profile';
import memberDb from '../../repository/member.db';
import memberService from '../../service/member.service';
import { MemberInput, ProfileInput } from '../../types';
import { Member as MemberPrisma, Payment as PaymentPrisma, Profile as ProfilePrisma } from '@prisma/client'; // Correct Prisma imports


// describe('Profile Tests', () => {
//     test('given: valid values for profile, when: profile is created, then: profile is created with those values', () => {
//         // given
//         const profileData = { name: "John", surname: "Doe", height: 180, weight: 75 };

//         // when
//         const profile = new Profile(profileData);

//         // then
//         expect(profile.getName()).toEqual(profileData.name);
//         expect(profile.getSurname()).toEqual(profileData.surname);
//         expect(profile.getHeight()).toEqual(profileData.height);
//         expect(profile.getWeight()).toEqual(profileData.weight);
//     });

//     test('given: an existing profile, when: profile values are updated, then: profile reflects the new values', () => {
//         // given
//         const profile = new Profile({ name: "John", surname: "Doe", height: 180, weight: 75 });

//         // when
//         profile.setName("Jane");
//         profile.setSurname("Smith");
//         profile.setHeight(170);
//         profile.setWeight(65);

//         // then
//         expect(profile.getName()).toEqual("Jane");
//         expect(profile.getSurname()).toEqual("Smith");
//         expect(profile.getHeight()).toEqual(170);
//         expect(profile.getWeight()).toEqual(65);
//     });

//     test('given: two identical profiles, when: checked for equality, then: they are equal', () => {
//         // given
//         const profile1 = new Profile({ name: "John", surname: "Doe", height: 180, weight: 75 });
//         const profile2 = new Profile({ name: "John", surname: "Doe", height: 180, weight: 75 });

//         // when
//         const isEqual = profile1.equals(profile2);

//         // then
//         expect(isEqual).toBe(true);
//     });
// });

// describe('Member Tests', () => {
//     test('given: valid values for member, when: member is created, then: member is created with those values', () => {
//         // given
//         const profile = new Profile({ name: "John", surname: "Doe", height: 180, weight: 75 });
//         const memberData = {
//             username: "john_doe",
//             email: "johndoe@example.com",
//             phoneNumber: "0475829054",
//             password: "SecurePassword@1",
//             profile: profile
//         };

//         // when
//         const member = new Member(memberData);

//         // then
//         expect(member.getUsername()).toEqual(memberData.username);
//         expect(member.getEmail()).toEqual(memberData.email);
//         expect(member.getPhoneNumber()).toEqual(memberData.phoneNumber);
//         expect(member.getProfile()).toEqual(profile);
//     });


// test('given: invalid phone number, when: member is created, then: an error is thrown', () => {
//     // given
//     const invalidMemberData = {
//         username: "john_doe",
//         email: "johndoe@example.com",
//         phoneNumber: "1234567890", // Invalid phone number
//         password: "SecurePassword@1",
//         profile: new Profile({ name: "John", surname: "Doe", height: 180, weight: 75 })
//     };

//     // when
//     const memberCreation = () => new Member(invalidMemberData);

//     // then
//     expect(memberCreation).toThrow("Invalid phone number format. It should start with +32 or 04 and have 10 digits.");
// });

// test('given: invalid password, when: member is created, then: an error is thrown', () => {
//     // given
//     const invalidMemberData = {
//         username: "john_doe",
//         email: "johndoe@example.com",
//         phoneNumber: "0475829054",
//         password: "weakpassword", // Invalid password
//         profile: new Profile({ name: "John", surname: "Doe", height: 180, weight: 75 })
//     };

//     // when
//     const memberCreation = () => new Member(invalidMemberData);

//     // then
//     expect(memberCreation).toThrow("Password must contain at least 8 characters, including an uppercase letter, lowercase letter, symbol (@#$), and a number.");
// });




//     test('given: two identical members, when: checked for equality, then: they are equal', () => {
//         // given
//         const profile = new Profile({ name: "John", surname: "Doe", height: 180, weight: 75 });
//         const member1 = new Member({
//             username: "john_doe",
//             email: "johndoe@example.com",
//             phoneNumber: "0475829054",
//             password: "SecurePassword@1",
//             profile: profile
//         });

//         const member2 = new Member({
//             username: "john_doe",
//             email: "johndoe@example.com",
//             phoneNumber: "0475829054",
//             password: "SecurePassword@1",
//             profile: profile
//         });

//         // when
//         const isEqual = member1.equals(member2);

//         // then
//         expect(isEqual).toBe(true);
//     });
// });

describe('Member.from', () => {
    it('should correctly map Prisma models to domain models', () => {
        const profilePrisma: ProfilePrisma = {
            id: 1,
            name: 'John',
            surname: 'Doe',
            height: 180,
            weight: 75,
        };

        const paymentPrisma: PaymentPrisma = {
            id: 1,
            amount: 100,
            date: new Date('2023-01-01'),
            dueDate: new Date('2023-02-01'),
            paymentStatus: true,
            memberId: 1,
        };

        const memberPrisma: MemberPrisma & { profile: ProfilePrisma; payments: PaymentPrisma[] } = {
            id: 1,
            username: 'johndoe',
            email: 'john@example.com',
            phoneNumber: '0475829054',
            password: 'password123',
            profile: profilePrisma,
            payments: [paymentPrisma],
            profileId: 1,
        };

        const member = Member.from(memberPrisma);

        expect(member.getId()).toBe(1);
        expect(member.getUsername()).toBe('johndoe');
        expect(member.getEmail()).toBe('john@example.com');
        expect(member.getPhoneNumber()).toBe('0475829054');
        expect(member.getPassword()).toBe('password123');

        const profile = member.getProfile();
        expect(profile).toBeInstanceOf(Profile);
        expect(profile?.getName()).toBe('John');
        expect(profile?.getSurname()).toBe('Doe');
        expect(profile?.getHeight()).toBe(180);
        expect(profile?.getWeight()).toBe(75);

        const payments = member.getPayments();
        expect(payments).toHaveLength(1);
        expect(payments[0]).toBeInstanceOf(Payment);
        expect(payments[0].getAmount()).toBe(100);
        expect(payments[0].getDate()).toEqual(new Date('2023-01-01'));
        expect(payments[0].getDueDate()).toEqual(new Date('2023-02-01'));
        expect(payments[0].getPaymentStatus()).toBe(true);
    });
});