import ShowAction from "../../src/actions/show.action"
import TrackedListManager from "../../src/manager/manager";

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
        const command = 'show lists and throw error please';
        action = new ShowAction(command);
        expect(() => action.act()).toThrowError('INVALID_INPUT');
    }
)

it('should throw error',
    () => {
        const command = 'show';
        action = new ShowAction(command);
        expect(() => action.act()).toThrowError('INVALID_INPUT');
    }
)

it('should print the help message',
    () => {
        ShowAction.printHelp();
        expect(console.log).toHaveBeenCalled();
    }
)
