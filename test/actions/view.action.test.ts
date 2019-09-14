import ViewAction from "../../src/actions/view.action"
import TrackedListManager from "../../src/manager/manager";
import Errors from "../../src/actions/utils/errors";

let action: ViewAction;
let target: Function;

beforeEach(
    () => {
        target = TrackedListManager.getTrackedListData = jest.fn(test => ['1','2','3']);
        console.log = jest.fn();
        jest.spyOn(process, 'exit').mockImplementation();
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
        const errorMessage = Errors.getErrorMessage('INVALID_INPUT', 'view', ['test', 'and', 'another', 'test'])
        const command = 'view test and another test';
        action = new ViewAction(command);
        action.act();
        expect(console.log).toHaveBeenCalledWith(errorMessage);
    }
)
