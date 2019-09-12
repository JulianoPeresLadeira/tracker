export abstract class Action {

    protected command: string;

    constructor(command: string) {
        this.command = command;
    }

    protected getCommandErrors(): Array<string> { return []; }

    public abstract act(command: string): void;
    public static printHelp(): void {};

}
