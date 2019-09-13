export default abstract class Action {

    protected command: string;

    constructor(command: string) {
        this.command = command;
    }

    protected getCommandErrors(): Array<string> { return []; }
    protected validateErrors(): void {
        const errors = this.getCommandErrors();
    
        if (errors.length > 0) {
            errors.forEach(
                error => console.log(error)
            );
            throw new Error(errors.join('\n'));
        }
    }

    public abstract act(): void;
    public static printHelp(): void {};

}
