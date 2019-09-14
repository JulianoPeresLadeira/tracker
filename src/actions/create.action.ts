import TrackedListManager from "../manager/manager";
import Action from "./action";

export default class CreateAction extends Action {

    protected getCommandErrors(): Array<string> {
        let errors: Array<string> = [];
        
        const splitCommand = this.command.split(' ');
        splitCommand.shift();
        const validListConcatenators = splitCommand.every(
            (commandWord, index) => index % 2 == 0 ? true : commandWord === 'and'
        );

        if (!validListConcatenators) {
            errors.push('INVALID_INPUT');
        }
            
        return errors;
    }

    private getTargetListNames(): Array<string> {
        const splitCommand: Array<string> = this.command.split(' ');
        splitCommand.shift();

        return splitCommand.filter((commandWord, index) => index % 2 == 0);
    }

    protected perform(): void {
        const targetList = this.getTargetListNames();
        targetList.forEach(target => TrackedListManager.createTrackedList(target))
    }

    public static printHelp(): void {
        const message = [
            'Creates a new tracked list.',
            'Usage:',
            '   create <list>',
            '   create <list1> and <list2> and <list3>...',
            'to create the passed list(s)'
        ]

        console.log(message.join('\n'));
    }
}
