import express, { NextFunction, Request, Response } from 'express';
import trainerService from '../service/trainer.service'; // Adjust path as needed
import { TrainerInput } from '../types'; // Ensure the correct path to types

const trainerRouter = express.Router();

trainerRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trainerInput = <TrainerInput>req.body;  // Get input data from the request body
        const response = await trainerService.trainerAuthentication(trainerInput);  // Call the authentication service
        res.status(200).json({ message: "Authentication Successful", ...response });
    } catch (error) {
        next(error);
    }
});
// Get all trainers
trainerRouter.get('/', async (req: Request, res: Response) => {
    try {
        const trainers = await trainerService.getAllTrainers();
        res.json(trainers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

// Get trainer by ID
trainerRouter.get('/:id', async (req: Request, res: Response) => {
    const trainerId = parseInt(req.params.id);

    try {
        const trainer = await trainerService.getTrainerById(trainerId);
        if (!trainer) {
            res.status(404).json({ error: `Trainer with id ${trainerId} not found.` });
        } else {
            res.json(trainer);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

// Get trainers by availability
trainerRouter.get('/availability', async (req: Request, res: Response) => {
    const { availability } = req.query;
    const availabilityBoolean = availability === 'true'; // Convert to boolean

    try {
        const trainers = await trainerService.getTrainersByAvailability(availabilityBoolean);
        res.json(trainers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

// Create a new trainer
trainerRouter.post('/', async (req: Request, res: Response) => {
    const trainerData: TrainerInput = req.body;

    try {
        const newTrainer = await trainerService.createTrainer(trainerData);
        res.status(201).json(newTrainer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error. See server log for details.' });
    }
});

export { trainerRouter };
