import trainerService from '../../service/trainer.service'; // Path to your trainer service
import trainerDB from '../../repository/trainer.db'; // Path to your trainer DB functions

jest.mock('../../repository/trainer.db');  // Mocking the trainer database functions

describe('Trainer Service', () => {
    describe('getAllTrainers', () => {
        it('should return all trainers', async () => {
            // Mocking the database call
            const mockTrainers = [
                { id: 1, name: 'Trainer 1', availability: true, language_spoken: 'English' },
                { id: 2, name: 'Trainer 2', availability: false, language_spoken: 'Spanish' }
            ];
            (trainerDB.getAllTrainers as jest.Mock).mockResolvedValue(mockTrainers);  // Mock the resolved value

            const result = await trainerService.getAllTrainers();

            // Check that the result matches the mocked trainers
            expect(result).toEqual(mockTrainers);
            expect(trainerDB.getAllTrainers).toHaveBeenCalledTimes(1);  // Ensure the DB call was made
        });

        it('should handle errors when fetching trainers', async () => {
            // Simulating a database error
            (trainerDB.getAllTrainers as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(trainerService.getAllTrainers()).rejects.toThrow('Error fetching all trainers.');
        });
    });
});

describe('Trainer Service', () => {
    describe('getTrainerById', () => {
        it('should return a trainer by id', async () => {
            const mockTrainer = { id: 1, name: 'Trainer 1', availability: true, language_spoken: 'English' };
            (trainerDB.getTrainerById as jest.Mock).mockResolvedValue(mockTrainer);  // Mock the resolved value

            const result = await trainerService.getTrainerById(1);

            expect(result).toEqual(mockTrainer);  // Check that the result matches the mocked trainer
            expect(trainerDB.getTrainerById).toHaveBeenCalledWith(1);  // Ensure the DB call was made with correct params
        });

        // it('should throw an error if trainer not found', async () => {
        //     // Simulating no trainer found
        //     (trainerDB.getTrainerById as jest.Mock).mockResolvedValue(null);

        //     await expect(trainerService.getTrainerById(999)).rejects.toThrow(`Trainer with id 999 does not exist..`);
        // });

        it('should handle errors when fetching trainer by id', async () => {
            // Simulating a database error
            (trainerDB.getTrainerById as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(trainerService.getTrainerById(1)).rejects.toThrow('Error fetching trainer with id 1.');
        });
    });
});

describe('Trainer Service', () => {
    describe('createTrainer', () => {
        it('should create a new trainer', async () => {
            const mockTrainerData = { name: 'Trainer 1', availability: true, language_spoken: 'English' };
            const mockCreatedTrainer = { id: 1, ...mockTrainerData };

            // Mocking the database call to create the trainer
            (trainerDB.createTrainer as jest.Mock).mockResolvedValue(mockCreatedTrainer);

            const result = await trainerService.createTrainer(mockTrainerData);

            expect(result).toEqual(mockCreatedTrainer);  // Check that the result matches the mock created trainer
            expect(trainerDB.createTrainer).toHaveBeenCalledWith(mockTrainerData);  // Ensure the DB call was made with the correct params
        });

        it('should handle errors when creating a trainer', async () => {
            const mockTrainerData = { name: 'Trainer 1', availability: true, language_spoken: 'English' };

            // Simulating a database error
            (trainerDB.createTrainer as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(trainerService.createTrainer(mockTrainerData)).rejects.toThrow('Error creating trainer.');
        });
    });
});