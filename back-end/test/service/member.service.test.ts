import { Member } from '../../model/member';
import { Profile } from '../../model/profile';
import memberDb from '../../repository/member.db';
import memberService from '../../service/member.service';
import { MemberInput, ProfileInput } from '../../types';

let createMemberMock: jest.Mock;
let mockMemberDbGetMemberById: jest.Mock;
let mockMemberDbIsUsernameUnique: jest.Mock;
let mockMemberDbAddMember: jest.Mock;

beforeEach(() => {
    mockMemberDbGetMemberById = jest.fn();
    mockMemberDbIsUsernameUnique = jest.fn();
    mockMemberDbAddMember = jest.fn();

    createMemberMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given valid member data, when registering a member, then the member is created with those values', () => {
    // given
    const profileInput: ProfileInput = {
        name: 'Alice',
        surname: 'Wonder',
        height: 165,
        weight: 55,
    };

    const memberInput: MemberInput = {
        username: 'alice_wonder',
        email: 'alice@example.com',
        phoneNumber: '0475829054',
        password: 'StrongPassword@1',
        profile: profileInput, // Using ProfileInput type
    };

    const newMember = new Member({ 
        ...memberInput, 
        profile: new Profile(profileInput) // Convert to Profile instance
    });
    
    memberDb.isUsernameUnique = mockMemberDbIsUsernameUnique.mockReturnValue(true);
    memberDb.addMember = mockMemberDbAddMember;

    // when
    memberService.registerMember(newMember);

    // then
    expect(mockMemberDbAddMember).toHaveBeenCalledTimes(1);
    expect(mockMemberDbAddMember).toHaveBeenCalledWith(newMember);
});

test('given an existing username, when registering a member, then an error is thrown', () => {
    // given
    const profileInput: ProfileInput = {
        name: 'John',
        surname: 'Doe',
        height: 180,
        weight: 75,
    };

    const existingMember = new Member({
        username: 'john_doe',
        email: 'john@example.com',
        phoneNumber: '0475820000',
        password: 'SecurePassword@1',
        profile: new Profile(profileInput), // Convert to Profile instance
    });

    memberDb.isUsernameUnique = mockMemberDbIsUsernameUnique.mockReturnValue(false);

    const createMember = () =>
        memberService.registerMember(existingMember);

    // when & then
    expect(createMember).toThrow('Username is already taken. Please choose another.');
});


test('given invalid phone number format, when registering a member, then an error is thrown', () => {
    const profileInput: ProfileInput = {
        name: 'Invalid',
        surname: 'Phone',
        height: 170,
        weight: 70,
    };

    try {
        const invalidPhoneMember = new Member({
            username: 'invalid_phone',
            email: 'invalid@example.com',
            phoneNumber: '123456789', // Invalid format
            password: 'StrongPassword@1',
            profile: new Profile(profileInput), // Convert to Profile instance
        });
        memberService.registerMember(invalidPhoneMember);
    } catch (error) {
        if (error instanceof Error) {
            expect(error.message).toBe("Invalid phone number format. It should start with +32 or 04 and have 10 digits.");
        } else {
            throw error; // re-throw if it's not the expected error type
        }
    }
});

test('given invalid password, when registering a member, then an error is thrown', () => {
    const profileInput: ProfileInput = {
        name: 'Weak',
        surname: 'Password',
        height: 160,
        weight: 65,
    };

    try {
        const weakPasswordMember = new Member({
            username: 'weak_password',
            email: 'weak@example.com',
            phoneNumber: '0475829054',
            password: 'weak', // Invalid password
            profile: new Profile(profileInput), // Convert to Profile instance
        });
        memberService.registerMember(weakPasswordMember);
    } catch (error) {
        if (error instanceof Error) {
            expect(error.message).toBe("Password must contain at least 8 characters, including an uppercase letter, lowercase letter, symbol (@#$), and a number.");

        } else {
            throw error;
        }
    }
});
