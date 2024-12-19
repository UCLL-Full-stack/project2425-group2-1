import { Member } from "@/types";

const getAllMembers = async () => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/members', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

const getMemberById = async (memberId: number) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/members/${memberId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

const registerMember = async (newMember: {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    profile: {
        name: string;
        surname: string;
    };
}) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/members/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMember),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

const updateProfile = async (id: number, profileUpdates: { height?: number; weight?: number; }): Promise<Member> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}/profile`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileUpdates),
        });
        if (!response.ok) {
            const errorResponse = await response.text(); // Use text() to capture the full response
            console.error('Server error:', errorResponse);
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

const MemberService = {
    getAllMembers,
    getMemberById,
    registerMember,
    updateProfile,
};

export default MemberService;