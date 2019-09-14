import HelpAction from "../../src/actions/help.action"
import Errors from "../../src/actions/utils/errors";
import Routes from "../../src/routes";
import AddAction from "../../src/actions/add.action";

let action: HelpAction;

beforeEach(
    () => {
        console.log = jest.fn();
    }
)

it('should throw invalid input error',
    () => {
        const errorMessage = Errors.getErrorMessage('INVALID_INPUT', 'help', ['me']);
        const command = 'help me'
        action = new HelpAction(command);
        expect(() => action.act()).toThrowError(errorMessage);
    }
)

it('should print the help message',
    () => {
        HelpAction.printHelp();
        expect(console.log).toHaveBeenCalled();
    }
)
