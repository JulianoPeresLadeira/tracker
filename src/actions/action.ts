import Errors from "./utils/errors";

export default abstract class Action {

    protected command: string;

    constructor(command: string) {
        this.command = command;
    }

    private throwError(errors: Array<string>) {
        const splitCommand = this.command.split(' ')
        const actionIdentifier = <string>splitCommand.shift();
        const errorMessages = errors.map(error => Errors.getErrorMessage(error, actionIdentifier, splitCommand));
        console.log(errorMessages.join('\n'));
        process.exit(1);
    }

    private validateErrors(): void {
        const errors = this.getCommandErrors();
        
        if (errors.length > 0) {
            this.throwError(errors);
        }
    }
    
    public act(): void {
        this.validateErrors();
        this.perform();
    };
    
    protected abstract perform(): void;
    protected getCommandErrors(): Array<string> { return []; }
    public static getHelpMessage(): Array<string> { return []; }

}
