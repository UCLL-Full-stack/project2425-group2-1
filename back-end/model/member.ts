import { Payment } from "./payment";
import { Profile } from "./profile";

export class Member {
  private id?: number; // Optional id
  private username: string;
  private email: string;
  private phoneNumber: string;
  private password: string;
  private profile: Profile;
  private payment: Payment[]; // Use singular form

  // Constructor to initialize the Member object
  constructor({ id, username, email, phoneNumber, password, profile, payment = [] }: 
      { 
          id?: number; 
          username: string; 
          email: string; 
          phoneNumber: string; 
          password: string; 
          profile: Profile; 
          payment?: Payment[]; // Use singular form
      }) {

        if (!this.validatePhoneNumber(phoneNumber)) {
          throw new Error("Invalid phone number format. It should start with +32 or 04 and have 10 digits.");
      }

      if (!this.validatePassword(password)) {
        throw new Error("Password must contain at least 8 characters, including an uppercase letter, lowercase letter, symbol (@#$), and a number.");
    }

      this.id = id;
      this.username = username;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.password = password;
      this.profile = profile;
      this.payment = payment; // Initialize payment
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
  addPayment(payment: Payment): void {
    this.payment.push(payment);
}

// Method to get all payments
getPayments(): Payment[] {
    return this.payment;
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