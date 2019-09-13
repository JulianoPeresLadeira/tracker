import ViewAction from "../../src/actions/view.action"
import TrackedListManager from "../../src/manager/manager";

let action: ViewAction;
let target: Function;

beforeEach(
    () => {
        target = TrackedListManager.getTrackedListData = jest.fn(test => ['1','2','3']);
        console.log = jest.fn();
    }
)


it ('should call add entry with the passed parameter',
    () => {
        const command = 'view test'
        action = new ViewAction(command);
        action.act();
        expect(target).toHaveBeenCalledWith('test');
        expect(console.log).toHaveBeenCalledTimes(3);
    }
)

it('should throw error',
    () => {
        const command = 'view test and another test';
        action = new ViewAction(command);
        expect(() => action.act()).toThrowError('INVALID_INPUT');
    }
)

it('should print the help message',
    () => {
        ViewAction.printHelp();
        expect(console.log).toHaveBeenCalled();
    }
)
