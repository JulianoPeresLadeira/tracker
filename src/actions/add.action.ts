import Action from "./action";
import TrackedListManager from "../manager/manager";

export default class AddAction extends Action {

    protected getCommandErrors(): Array<string> {
        let errors: Array<string> = [];
        
        const splitCommand = this.command.split(' ');
        
        if (splitCommand.length < 4) {
            errors.push('INVALID_INPUT');
        }
        
        const targetTrackedList = splitCommand.pop();
        const listPrefix = splitCommand.pop();

        if (listPrefix !== 'to') {
            errors.push('INVALID_INPUT');
        }

        const duplicatesRemoved = errors.reduce((acc, curr) => {acc[curr] = true; return acc}, {})
        return Object.keys(duplicatesRemoved);
    }

    private getTargetTrackedList(): string {
        const splitCommand = this.command.split(' ');
        return <string> splitCommand.pop();
    }

    private getEntryData(): string {
        const splitCommand = this.command.split(' ');
        splitCommand.shift();
        splitCommand.pop();
        splitCommand.pop();
        return splitCommand.join(' ');
    }

    protected perform(): void {
        const targetTrackedList = this.getTargetTrackedList();
        const entryData = this.getEntryData();

        TrackedListManager.addEntryToTrackedList(targetTrackedList, entryData);
    }

    public static getHelpMessage(): Array<string> {
        const message = [
            'Adds a new entry to the given target list',
            'Usage:',
            '   add <entry> to <list>',
            'to add the selected entry to the list'
        ]

        return message;
    }
}
