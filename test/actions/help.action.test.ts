import HelpAction from "../../src/actions/help.action"

let action: HelpAction;

beforeEach(
    () => {
        console.log = jest.fn();
    }
)

it('should call console.log',
    () => {
        const command = 'help';
        action = new HelpAction(command);
        action.act();
        expect(console.log).toHaveBeenCalled();
    }
)


it('should throw invalid input error',
    () => {
        const command = 'help me'
        action = new HelpAction(command);
        expect(() => action.act()).toThrowError('INVALID_INPUT');
    }
)



it('should print the help message',
    () => {
        HelpAction.printHelp();
        expect(console.log).toHaveBeenCalled();
    }
)
