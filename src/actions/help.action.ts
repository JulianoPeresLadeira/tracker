import Action from "./action";
import Validations from "./utils/validations";
import routes from "../routes";

export default class HelpAction extends Action {

    protected getCommandErrors = Validations.noParameterCommandValidation(this.command);

    protected perform(): void {
        Object.keys(routes).forEach(key => HelpAction.printHelp());
    }

    public static printHelp(): void {
        const message = [
            'Prints this message!',
            'Usage:',
            '   help',
        ];

        console.log(message.join('\n'));
    }
}
