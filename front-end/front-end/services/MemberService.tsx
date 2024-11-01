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
}

const registerMember = async (newMember: {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
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

const MemberService = {
    getAllMembers,
    getMemberById,
    registerMember,
};

export default MemberService;