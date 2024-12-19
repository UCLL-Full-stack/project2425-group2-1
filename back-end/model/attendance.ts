import { Attendance as AttendancePrisma } from '@prisma/client';

export class Attendance {
    public id?: number;
    public attendance_tracking: boolean;
    public trainerId: number; // Link to the trainer

    constructor({
        id,
        attendance_tracking,
        trainerId,
    }: {
        id?: number;
        attendance_tracking: boolean;
        trainerId: number;
    }) {
        this.id = id;
        this.attendance_tracking = attendance_tracking;
        this.trainerId = trainerId;
    }

    static from(attendancePrisma: AttendancePrisma): Attendance {
        return new Attendance({
            id: attendancePrisma.id,
            attendance_tracking: attendancePrisma.attendance_tracking,
            trainerId: attendancePrisma.trainerId,
        });
    }
}
