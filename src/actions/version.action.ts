import Action from "./action";
import Validations from "./utils/validations";

export default class VersionAction extends Action {
    protected getCommandErrors = Validations.noParameterCommandValidation(this.command);

    public perform(): void {
        const packageInformation = require('../../package.json');
        console.log(packageInformation.version);
    }

    public static printHelp(): void {
        const message = [
            'Shows current version of the program',
            'Usage:',
            '   -v',
            '   version'
        ];

        console.log(message.join('\n'));
    }

}
