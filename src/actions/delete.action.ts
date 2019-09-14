import Action from "./action";
import Validations from "./utils/validations";
import Commons from "./utils/commons";
import TrackedListManager from "../manager/manager";

export default class DeleteAction extends Action {

    protected getCommandErrors = Validations.singleParameterCommandValidation(this.command);

    public perform(): void {
        const list = Commons.getParameter(this.command);
        TrackedListManager.deleteTrackedList(list);
    }

    public static getHelpMessage(): Array<string> {
        const message = [
            'Deletes a tracked list',
            'Usage:',
            '   delete <list>'
        ];
        return message;
    }

}
