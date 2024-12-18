import { Trainer } from '../../model/trainer';
import { Attendance } from '../../model/attendance';
import { Trainer as TrainerPrisma, Attendance as AttendancePrisma } from '@prisma/client';

describe('Trainer Model', () => {
    it('should map from Prisma Trainer to Trainer instance', () => {
        // Create a mock attendance instance from Prisma
        const attendancePrisma: AttendancePrisma = {
            id: 1,
            attendance_tracking: true,
            // trainerId: 1,  // Assuming there's a trainerId field in the Attendance table
            // Any other fields you may have in Attendance
        };

        // Create a mock trainer instance from Prisma
        const trainerPrisma: TrainerPrisma & { attendances: AttendancePrisma[] } = {
            id: 1,
            name: 'Jane Doe',
            availability: true,
            language_spoken: 'English, Dutch',
            attendances: [attendancePrisma],  // Attaching the mock attendance
        };

        // Convert the Prisma instance to the model instance using the 'from' method
        const trainer = Trainer.from(trainerPrisma);

        // Assertions to check if the transformation worked correctly
        expect(trainer).toBeInstanceOf(Trainer);
        expect(trainer.id).toBe(1);
        expect(trainer.name).toBe('Jane Doe');
        expect(trainer.availability).toBe(true);
        expect(trainer.language_spoken).toBe('English, Dutch');
        expect(trainer.attendances).toHaveLength(1);
        expect(trainer.attendances![0]).toBeInstanceOf(Attendance);
    });
});

describe('Trainer Model', () => {
    it('should create a new Trainer instance', () => {
        // Define trainer data (this is how you would create the Trainer instance)
        const trainerData = {
            id: 1,
            name: 'Jane Doe',
            availability: true,
            language_spoken: 'English, Dutch',
            attendances: [],  // Empty array for attendances
        };

        // Create a new instance of Trainer
        const trainer = new Trainer(trainerData);

        // Assertions to check the created Trainer instance
        expect(trainer).toBeInstanceOf(Trainer);
        expect(trainer.id).toBe(1);
        expect(trainer.name).toBe('Jane Doe');
        expect(trainer.availability).toBe(true);
        expect(trainer.language_spoken).toBe('English, Dutch');
        expect(trainer.attendances).toEqual([]);
    });
});

describe('Trainer Model', () => {
    it('should create a Trainer instance without attendances', () => {
        // Define trainer data without attendances
        const trainerData = {
            id: 1,
            name: 'Jane Doe',
            availability: true,
            language_spoken: 'English, Dutch',
        };

        // Create a new instance of Trainer
        const trainer = new Trainer(trainerData);

        // Assertions to check the created Trainer instance without attendances
        expect(trainer).toBeInstanceOf(Trainer);
        expect(trainer.id).toBe(1);
        expect(trainer.name).toBe('Jane Doe');
        expect(trainer.availability).toBe(true);
        expect(trainer.language_spoken).toBe('English, Dutch');
        expect(trainer.attendances).toBeUndefined();  // Should be undefined if not passed
    });
});
