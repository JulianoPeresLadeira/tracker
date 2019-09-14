import DeleteAction from "../../src/actions/delete.action"
import TrackedListManager from "../../src/manager/manager";

let action: DeleteAction;
let target: Function;

beforeEach(
    () => {
        target = TrackedListManager.deleteTrackedList = jest.fn();
        console.log = jest.fn();
    }
)


it ('should call delete list with the passed parameter',
    () => {
        const command = 'delete test'
        action = new DeleteAction(command);
        action.act();
        expect(target).toHaveBeenCalledWith('test');
    }
)

it('should throw error',
    () => {
        const command = 'delete test and another test';
        action = new DeleteAction(command);
        expect(() => action.act()).toThrowError('INVALID_INPUT');
    }
)

it('should print the help message',
    () => {
        DeleteAction.printHelp();
        expect(console.log).toHaveBeenCalled();
    }
)
