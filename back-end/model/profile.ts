export class Profile {
    private id?: number;        // Optional id
    private name: string;       // Name of the profile member
    private surname: string;    // Surname of the profile member
    private height: number;     // Height (in cm, for example)
    private weight: number;     // Weight (in kg, for example)

    // Constructor to initialize the Profile object
    constructor(profile: { name: string, surname: string, height: number, weight: number }) {
        this.name = profile.name;
        this.surname = profile.surname;
        this.height = profile.height;
        this.weight = profile.weight;      
    }

    // Getter methods for accessing private properties

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

    // Equals method to compare two Profile objects
     equals(profile: Profile): boolean {
        return (
            this.name === profile.getName() &&
            this.surname === profile.getSurname() &&
            this.height === profile.getHeight() &&
            this.weight === profile.getWeight()
        );
    }
}
