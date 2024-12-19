import trainerDB from '../repository/trainer.db';  // Importing the trainer database functions
import { Trainer } from '../model/trainer';  // Importing the Trainer model
import { TrainerInput, AuthenticationResponse } from '../types';
import bcrypt from 'bcrypt';


// Service method to fetch all trainers
const getAllTrainers = async (): Promise<Trainer[]> => {
    try {
        return await trainerDB.getAllTrainers();  // Call the getAllTrainers function from trainerDB
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching all trainers.');
    }
};

// Service method to fetch a trainer by their ID
const getTrainerById = async (id: number): Promise<Trainer> => {
    try {
        const trainer = await trainerDB.getTrainerById( id );  // Call the getTrainerById function from trainerDB
        if (!trainer) {
            throw new Error(`Trainer with id ${id} does not exist.`);  // Error if trainer not found
        }
        return trainer;
    } catch (error) {
        console.error(error);
        throw new Error(`Error fetching trainer with id ${id}.`);
    }
};

// Service method to fetch trainers by availability
const getTrainersByAvailability = async (availability: boolean): Promise<Trainer[]> => {
    try {
        return await trainerDB.getTrainersByAvailability(availability );  // Fetch trainers by availability from trainerDB
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching trainers by availability.');
    }
};

// Service method to create a new trainer
const createTrainer = async (trainerData: TrainerInput): Promise<Trainer> => {
    try {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(trainerData.password, 13);

        // Replace the plain password with the hashed password
        const trainerDataWithHashedPassword = {
            ...trainerData,
            password: hashedPassword,
        };

        // Create a new trainer via trainerDB
        return await trainerDB.createTrainer(trainerDataWithHashedPassword);
    } catch (error) {
        console.error(error);
        throw new Error('Error creating trainer.');
    }
};

const getTrainerByUsername = async ({ name }: { name: string }): Promise<Trainer | null> => {
    try {
        const trainer = await trainerDB.getTrainerByUsername({ name }); // Fetch member from database by username
        if (!trainer) {
            throw new Error(`Trainer with username ${name} not found.`);
        }
        return trainer;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching Trainer by username.');
    }
};

const trainerAuthentication = async ({ name, password }: TrainerInput): Promise<AuthenticationResponse> => {
    const trainer = await getTrainerByUsername({ name });
    if (!trainer) {
        throw new Error('Trainer not found');
    }

    if (!trainer.password) {
        throw new Error('Trainer password is undefined');
    }
    const isValidPassword = await bcrypt.compare(password, trainer.password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }


    return {
        token: generateJwtToken({ name }),  // Use the same token generation
        username: trainer.name,
        fullname : trainer.name,
    };
};
function generateJwtToken(arg0: { name: string; }): string {
    throw new Error('Function not implemented.');
}
// Export the service methods for use in other parts of the application
export default {
    getAllTrainers,
    getTrainerById,
    getTrainersByAvailability,
    createTrainer,
    trainerAuthentication,
};
