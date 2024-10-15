export class Trainer {
    private id?: number;         // Optional id
    private name: string;        // Name of the trainer
    private availability: boolean;  // Trainer's availability (true = available, false = not available)
    private languageSpoken: any[];  // List of languages spoken (can contain any type of values)

    // Constructor to initialize the Trainer object
    constructor(trainer: { name: string, availability: boolean, languageSpoken: any[]}) {
        this.name = trainer.name;
        this.availability = trainer.availability;
        this.languageSpoken = trainer.languageSpoken;
       
    };

    // Getter methods for accessing private properties

    // Get the id (optional)
    public getId(): number | undefined {
        return this.id;
    }

    // Get the name of the trainer
    public getName(): string {
        return this.name;
    }

    // Get the availability of the trainer
    public getAvailability(): boolean {
        return this.availability;
    }

    // Get the list of languages spoken by the trainer
    public getLanguageSpoken(): any[] {
        return this.languageSpoken;
    }

    // Equals method to compare two Trainer objects
    public equals(otherTrainer: Trainer): boolean {
        // Compare name, availability, and languageSpoken
        return (
            this.name === otherTrainer.getName() &&
            this.availability === otherTrainer.getAvailability() &&
            JSON.stringify(this.languageSpoken) === JSON.stringify(otherTrainer.getLanguageSpoken()) //JSON.stringify() converts the array into a JSON string (which is just a string representation of the array). If two arrays contain the same values in the same order, their JSON string representations will be identical.
        );
    }
}
