import jwt from 'jsonwebtoken';

const generateJwtToken = ({ username, role }: { username: string, role : string }): string => {
    try {
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is required.');
        }

        const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'GymManagement' };
        return jwt.sign({ username , role}, jwtSecret, options);
    } catch (error) {
        console.error('Error generating JWT token:', error);
        throw new Error('Error generating JWT token.');
    }
};

export { generateJwtToken };
