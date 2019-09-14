import ShowAction from "../../src/actions/show.action"
import TrackedListManager from "../../src/manager/manager";
import Errors from "../../src/actions/utils/errors";

let action: ShowAction;
let target: Function;

beforeEach(
    () => {
        target = TrackedListManager.getListNames = jest.fn(() => ['test']);
        console.log = jest.fn();
    }
)

it('should call console.log',
    () => {
        const command = 'show lists';
        action = new ShowAction(command);
        action.act();
        expect(console.log).toHaveBeenCalled();
    }
)

it('should throw error',
    () => {
        const errorMessage = Errors.getErrorMessage('INVALID_INPUT', 'view', ['lists', 'and', 'throw', 'error', 'please']);
        const command = 'show lists and throw error please';
        action = new ShowAction(command);
        expect(() => action.act()).toThrow(errorMessage);
    }
)

it('should throw error',
    () => {
        const errorMessage = Errors.getErrorMessage('INVALID_INPUT', 'view', []);
        const command = 'show';
        action = new ShowAction(command);
        expect(() => action.act()).toThrowError(errorMessage);
    }
)

it('should print the help message',
    () => {
        ShowAction.printHelp();
        expect(console.log).toHaveBeenCalled();
    }
)
