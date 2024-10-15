
export class Member{
    private id ?: number;
    private userName : string;
    private email : string;
    private password : string;
    private phoneNumber: number;

    constructor(member : {userName : string, email : string, password: string, phoneNumber : number}){
        this.userName = member.userName;
        this.email = member.email;
        this.password = member.password;
        this.phoneNumber = member.phoneNumber;
    }

    getId() : number | unknown {
        return this.id;
    }

    getUserName() : string{
        return this.userName;
    }

    getEmail() : string{
        return this.email;
    }

    getpassword() : string{
        return this.password;
    }

    getPhoneNumber() : number{
        return this.phoneNumber;
    }

    equals(member : Member){
        this.id === member.getId() &&
        this.userName === member.getUserName() &&
        this.email === member.getEmail()&&
        this.password === member.getpassword() &&
        this.phoneNumber === member.getPhoneNumber()
    };
};