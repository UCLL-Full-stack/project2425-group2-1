w// attendance.ts
import { Attendance as AttendancePrisma, Member as MemberPrisma, Trainer as TrainerPrisma } from '@prisma/client';
import { Member } from './member';
import { Trainer } from './model/trainer';

export class Attendance {
    public id?: number;
    public attendance_tracking: string;
    public memberId: number[];
    public members: Member[];
    public trainerId: number[];
    public trainers: Trainer[];

    constructor(attendance: {
        id?: number;
        attendance_tracking: string;
        memberId: number[];
        members?: Member[];
        trainerId: number[];
        trainers?: Trainer[];
    }) {
        this.id = attendance.id;
        this.attendance_tracking = attendance.attendance_tracking;
        this.memberId = attendance.memberId;
        this.members = attendance.members || [];
        this.trainerId = attendance.trainerId;
        this.trainers = attendance.trainers || [];
    }

    getId(): number | undefined {
        return this.id;
    }

    getAttendanceTracking(): string {
        return this.attendance_tracking;
    }


    getMemberId(): number[] {
        return this.memberId;
    }

    getMembers(): Member[] {
        return this.members;
    }

    getTrainerId(): number[] {
        return this.trainerId;
    }

    getTrainers(): Trainer[] {
        return this.trainers;
    }

    setAttendanceTracking(attendance_tracking: string): void {
        this.attendance_tracking = attendance_tracking;
    }


    setMemberId(memberId: number[]): void {
        this.memberId = memberId;
    }

    setMembers(members: Member[]): void {
        this.members = members;
    }

    setTrainerId(trainerId: number[]): void {
        this.trainerId = trainerId;
    }

    setTrainers(trainers: Trainer[]): void {
        this.trainers = trainers;
    }

    equals(attendance: Attendance): boolean {
        return (
            this.attendance_tracking === attendance.getAttendanceTracking() &&
            JSON.stringify(this.memberId) === JSON.stringify(attendance.getMemberId()) &&
            JSON.stringify(this.trainerId) === JSON.stringify(attendance.getTrainerId())
        );
    }

    static from(attendancePrisma: AttendancePrisma): Attendance {
        return new Attendance({
            id: attendancePrisma.id,
            attendance_tracking: attendancePrisma.attendance_tracking,
            memberId: attendancePrisma.memberId,
            members: attendancePrisma.members.map(Member.from),
            trainerId: attendancePrisma.trainerId,
            trainers: attendancePrisma.trainers.map(Trainer.from),
        });
    }
}
