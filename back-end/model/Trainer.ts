// trainer.ts
import { Trainer as TrainerPrisma, Attendance as AttendancePrisma } from '@prisma/client';
import { Attendance } from './attendance';

export class Trainer {
    public id?: number;
    public name: string;
    public availability: string;
    public language_known: string;
    public attendances: Attendance[];

    constructor(trainer: {
        id?: number;
        name: string;
        expertise: string;
        ratings: number;
        availability: string;
        language_known: string;
        attendances?: Attendance[];
    }) {
        this.id = trainer.id;
        this.name = trainer.name;
        this.availability = trainer.availability;
        this.language_known = trainer.language_known;
        this.attendances = trainer.attendances || [];
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getAvailability(): string {
        return this.availability;
    }

    getLanguageKnown(): string {
        return this.language_known;
    }

    getAttendances(): Attendance[] {
        return this.attendances;
    }

    setName(name: string): void {
        this.name = name;
    }

  

    setAvailability(availability: string): void {
        this.availability = availability;
    }

    setLanguageKnown(language_known: string): void {
        this.language_known = language_known;
    }

    setAttendances(attendances: Attendance[]): void {
        this.attendances = attendances;
    }

    equals(trainer: Trainer): boolean {
        return (
            this.name === trainer.getName() &&
            this.availability === trainer.getAvailability() &&
            this.language_known === trainer.getLanguageKnown()
        );
    }

    static from(trainerPrisma: TrainerPrisma): Trainer {
        return new Trainer({
            id: trainerPrisma.id,
            name: trainerPrisma.name,
            expertise: trainerPrisma.expertise,
            ratings: trainerPrisma.ratings,
            availability: trainerPrisma.availability,
            language_known: trainerPrisma.language_known,
            attendances: trainerPrisma.attendances.map(Attendance.from),
        });
    }
}
