import Action from "./action";
import Validations from "./utils/validations";
import Routes from "../routes";

export default class HelpAction extends Action {

    protected getCommandErrors = Validations.noParameterCommandValidation(this.command);

    protected perform(): void {

        const messages = {};

        Object.keys(Routes).forEach(key => 
            {
                const action = Routes[key];

                if(!messages[action.name]) {
                    messages[action.name] = {
                        commands: [key],
                        message: action.getHelpMessage()
                    };
                } else {
                    messages[action.name].commands.push(key)
                }
            }
        );

        Object.keys(messages).forEach(
            message => {
                const commands = messages[message].commands;
                const helpMessage = messages[message].message;

                let messageToPrint = [`${commands.join(', ')}\t\t\t\t${helpMessage.shift()}`]
                messageToPrint = messageToPrint.concat(helpMessage.map(msg => `\t\t\t\t\t${msg}`));

                console.log(messageToPrint.join('\n'));
            }
        )
    }

    public static getHelpMessage(): Array<string> {
        const message = [
            'Prints this message!',
            'Usage:',
            '   help',
        ];

        return message;
    }
}
