import { Trainer as TrainerPrisma, Attendance as AttendancePrisma } from '@prisma/client';
import { Attendance } from './attendance';

export class Trainer {
    public id?: number;
    public name: string;
    public password?: string;
    public availability: boolean;
    public language_spoken: string;
    public attendances?: Attendance[]; // Directly linked via trainerId

    constructor({
        id,
        name,
        password,
        availability,
        language_spoken,
        attendances = [],
    }: {
        id?: number;
        name: string;
        password?: string;
        availability: boolean;
        language_spoken: string;
        attendances?: Attendance[];
    }) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.availability = availability;
        this.language_spoken = language_spoken;
        this.attendances = attendances;
    }

    static from({
        id,
        name,
        availability,
        password,
        language_spoken,
        attendances,
    }: TrainerPrisma & { attendances?: AttendancePrisma[] }): Trainer {
        return new Trainer({
            id,
            name,
            password,
            availability,
            language_spoken,
            attendances: attendances ? attendances.map((attendance) => Attendance.from(attendance)) : [],
        });
    }
}
