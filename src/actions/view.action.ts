import Action from "./action";
import TrackedListManager from "../manager/manager";

export default class ViewAction extends Action {

    protected getCommandErrors(): Array<string> {

        let errors: Array<string> = [];
        
        const splitCommand = this.command.split(' ');
        splitCommand.shift();
        
        if (splitCommand.length !== 1) {
            errors.push('INVALID_INPUT');
        }
            
        return errors;
    }
    
    private getTargetTrackedList(): string {
        const splitCommand = this.command.split(' ');
        splitCommand.shift();
        return splitCommand[0];
    }

    public act(): void {
        super.validateErrors();
        const data: Array<string> = TrackedListManager.getTrackedListData(this.getTargetTrackedList());

        data.forEach(
            entry => console.log(entry)
        )
    }

    public static printHelp(): void {
        const message = [
            'Views all the entries on target list',
            'Usage:',
            '   view <list>',
        ]

        console.log(message.join('\n'));
    }
}
