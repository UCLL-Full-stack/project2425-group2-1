import { Attendance as AttendancePrisma,
    Trainer as TrainerPrisma
 } from '@prisma/client';
import { Member } from './member';
import { Trainer } from './trainer';

export class Attendance {
    public id?: number;
    public attendance_tracking: boolean;
    public trainers?: Trainer[];

    constructor({
        id,
        attendance_tracking,
        trainers,
    }: {
        id?: number;
        attendance_tracking: boolean;
        trainers?: Trainer[];
    }) {
        this.id = id;
        this.attendance_tracking = attendance_tracking;
        this.trainers = trainers;
    }

    static from({
        id,
        attendance_tracking,
        trainers,
    }: AttendancePrisma & { trainers?: TrainerPrisma[] }): Attendance {
        return new Attendance({
            id,
            attendance_tracking,
            trainers: trainers?.map((trainer) => Trainer.from(trainer)), // Map trainers
        });
    }
}
