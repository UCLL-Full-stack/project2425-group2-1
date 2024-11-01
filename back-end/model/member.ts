import { Profile } from "./profile";

export class Member {
  private id?: number;
  private username: string;
  private email: string;
  private phoneNumber: string;
  private password: string;
  private profile : Profile;

  constructor(member: {id?: number, username: string, email: string, phoneNumber: string, password: string, profile : Profile}) {
    if (!this.validatePhoneNumber(member.phoneNumber)) {
      throw new Error("Invalid phone number format. It should start with +32 or 04 and have 10 digits.");
    }
    if (!this.validatePassword(member.password)) {
      throw new Error("Password must contain at least 8 characters, including an uppercase letter, lowercase letter, symbol (@#$), and a number.");
    }
    this.id = member.id;
    this.username = member.username;
    this.email = member.email;
    this.phoneNumber = member.phoneNumber;
    this.password = member.password;
    this.profile = member.profile;
  }

  getId(): number | undefined {
    return this.id;
  }


  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getPassword(): string {
    return this.password;
  }

  getProfile() : Profile {
    return this.profile;
  } 
  equals(member: Member): boolean {
    return (
      this.username === member.getUsername() &&
      this.email === member.getEmail() &&
      this.phoneNumber === member.getPhoneNumber()
    );
  }

  private validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^(?:\+32|04)\d{8}$/;
    return phoneRegex.test(phoneNumber);
  }

  private validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!&+=])[A-Za-z\d@#$%^&*!&+=]{8,}$/;
    return passwordRegex.test(password);
  }
}