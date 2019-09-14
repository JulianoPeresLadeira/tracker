import AddAction from "../../src/actions/add.action"
import TrackedListManager from "../../src/manager/manager";
import Errors from "../../src/actions/utils/errors";

let action: AddAction;
let target: Function;

beforeEach(
    () => {
        target = TrackedListManager.addEntryToTrackedList = jest.fn();
        console.log = jest.fn();
        jest.spyOn(process, 'exit').mockImplementation();
    }
)

it ('should call add entry with the passed parameter',
    () => {
        const command = 'add hello, this is a test to test'
        action = new AddAction(command);
        action.act();
        expect(target).toHaveBeenCalledWith('test', 'hello, this is a test');
    }
)

describe('Test if exceptions are thrown',
    () => {
        it('should throw exception on malformed input',
            () => {
                const errorMessage = Errors.getErrorMessage('INVALID_INPUT', 'view', []);
                const command = 'add'
                action = new AddAction(command);
                action.act()
                expect(console.log).toHaveBeenCalledWith(errorMessage);
            }
        )

        it('should throw exception on malformed input',
            () => {
                const errorMessage = Errors.getErrorMessage('INVALID_INPUT', 'view', []);
                const command = 'add test'
                action = new AddAction(command);
                action.act();
                expect(console.log).toHaveBeenCalledWith(errorMessage);
            }
        )
        it('should throw exception on malformed input',
            () => {
                const errorMessage = Errors.getErrorMessage('INVALID_INPUT', 'add', ['test', 'test', 'test', 'test']);
                const command = 'add test test test test'
                action = new AddAction(command);
                action.act();
                expect(console.log).toHaveBeenCalledWith(errorMessage);

            }
        )
    }
)
