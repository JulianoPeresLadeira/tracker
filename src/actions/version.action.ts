import Action from "./action";
import Validations from "./utils/validations";

export default class VersionAction extends Action {
    protected getCommandErrors = Validations.noParameterCommandValidation(this.command);

    public perform(): void {
        const packageInformation = require('../../package.json');
        console.log(packageInformation.version);
    }

    public static getHelpMessage(): Array<string> {
        const message = [
            'Shows current version of the program',
            'Usage:',
            '   -v',
            '   version'
        ];
        return message;
    }

}
