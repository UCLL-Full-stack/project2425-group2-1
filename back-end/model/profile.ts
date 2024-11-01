export class Profile {
    private id?: number;
    private name: string;
    private surname: string;
    private height: number; // height in cm
    private weight: number; // weight in kg

    constructor(profile: { id?: number; name: string; surname: string; height: number; weight: number; }) {
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

    setName(name: string) {
        this.name = name;
    }

    setSurname(surname: string) {
        this.surname = surname;
    }

    setHeight(height: number) {
        this.height = height;
    }

    setWeight(weight: number) {
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
}
