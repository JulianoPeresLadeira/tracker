import Action from "./action";
import Validations from "./utils/validations";
import TrackedListManager from "../manager/manager";

export default class ShowAction extends Action {
    protected getCommandErrors(): Array<string> {
        const errors = Validations.singleParameterCommandValidation(this.command)();
        if (this.command.split(' ')[1] != 'lists' && !errors.some(error => 'INVALID_INPUT')) {
            errors.push('INVALID_INPUT');
        }

        return errors;
    }

    protected perform() {
        const names = TrackedListManager.getListNames();
        names.forEach(name => console.log(name));
    }

    public static getHelpMessage(): Array<string> {
        const message = [
            'Shows every list currently being persisted',
            'Usage:',
            '   show lists'
        ]

        return message;
    }
}
