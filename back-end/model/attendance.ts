

export class Attendance {
    private id ?: number;
    private attendanceTracking : boolean;
    

    constructor(attendance : {attendanceTracking : boolean}){
        this.attendanceTracking = attendance.attendanceTracking;
    }

    getId() : number | unknown{
        return this.id;
    }
    getAttendanceTracking() : boolean{
        return this.attendanceTracking;
    }

    equals(attendance : Attendance) : boolean{
        return(
            this.id === attendance.getId() &&
            this.attendanceTracking === this.getAttendanceTracking()
        )
    }

}