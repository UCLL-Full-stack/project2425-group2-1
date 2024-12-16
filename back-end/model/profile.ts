import { Profile as ProfilePrisma } from '@prisma/client';
export class Profile {
    public id?: number;
    public name: string;
    public surname: string;
    public height: number; // height in cm
    public weight: number; // weight in kg

    constructor(profile: {
        id?: number;
        name: string;
        surname: string;
        height: number;
        weight: number;
    }) {
        this.id = profile.id;
        this.name = profile.name;
        this.surname = profile.surname;
        this.height = profile.height;
        this.weight = profile.weight;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
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

    setName(name: string): void {
        this.name = name;
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
            this.name === profile.getName() &&
            this.surname === profile.getSurname() &&
            this.height === profile.getHeight() &&
            this.weight === profile.getWeight()
        );
    }

    static from({ id, name, surname, height, weight }: ProfilePrisma): Profile {
        return new Profile({
            id,
            name,
            surname,
            height,
            weight,
        });
    }
}
