import {Profile as ProfilePrisma} from '@prisma/client';
export class Profile {
    public id?: number;
    public firstname: string;
    public surname: string;
    public height: number; // height in cm
    public weight: number; // weight in kg

    constructor(profile: { id?: number; firstname: string; surname: string; height: number; weight: number }) {
        this.id = profile.id;
        this.firstname = profile.firstname;
        this.surname = profile.surname;
        this.height = profile.height;
        this.weight = profile.weight;
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstname;
    }

    getSurname(): string {
        return this.surname;
    }

    getHeight(): number {
        return this.height;
    }

    getWeight(): number {
        return this.weight;
    }

    setFirstName(firstname: string): void {
        this.firstname = firstname;
    }

    setSurname(surname: string): void {
        this.surname = surname;
    }

    setHeight(height: number): void {
        this.height = height;
    }

    setWeight(weight: number): void {
        this.weight = weight;
    }
    
    equals(profile: Profile): boolean {
        return (
            this.firstname === profile.getFirstName() &&
            this.surname === profile.getSurname() &&
            this.height === profile.getHeight() &&
            this.weight === profile.getWeight()
        );
    }
    static from({
        id,
        firstname,
        surname,
        height,
        weight,
    }: ProfilePrisma): Profile {
        return new Profile({
            id,
            firstname,
            surname,
            height,
            weight,
        });
    }

}