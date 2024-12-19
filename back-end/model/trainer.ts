import { Trainer as TrainerPrisma, Attendance as AttendancePrisma } from '@prisma/client';
import { Attendance } from './attendance';

export class Trainer {
    public id?: number;
    public name: string;
    public availability: boolean;
    public language_spoken: string;
    public attendances?: Attendance[]; // Directly linked via trainerId

    constructor({
        id,
        name,
        availability,
        language_spoken,
        attendances = [],
    }: {
        id?: number;
        name: string;
        availability: boolean;
        language_spoken: string;
        attendances?: Attendance[];
    }) {
        this.id = id;
        this.name = name;
        this.availability = availability;
        this.language_spoken = language_spoken;
        this.attendances = attendances;
    }

    static from({
        id,
        name,
        availability,
        language_spoken,
        attendances,
    }: TrainerPrisma & { attendances?: AttendancePrisma[] }): Trainer {
        return new Trainer({
            id,
            name,
            availability,
            language_spoken,
            attendances: attendances ? attendances.map((attendance) => Attendance.from(attendance)) : [],
        });
    }
}
