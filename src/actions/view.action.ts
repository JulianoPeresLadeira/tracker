import Action from "./action";
import TrackedListManager from "../manager/manager";
import Validations from "./utils/validations";
import Commons from "./utils/commons";

export default class ViewAction extends Action {


    protected getCommandErrors = Validations.singleParameterCommandValidation(this.command);

    protected perform(): void {
        const data: Array<string> = TrackedListManager.getTrackedListData(Commons.getParameter(this.command));

        data.forEach(
            entry => console.log(entry)
        )
    }

    public static getHelpMessage(): Array<string> {
        const message = [
            'Views all the entries on target list',
            'Usage:',
            '   view <list>',
        ]
        return message;
    }
}
