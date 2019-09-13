import AddAction from "../../src/actions/add.action"
import TrackedListManager from "../../src/manager/manager";

let action: AddAction;
let target: Function;

beforeEach(
    () => {
        target = TrackedListManager.addEntryToTrackedList = jest.fn();
        console.log = jest.fn();
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

describe('Test is exception are thrown',
    () => {
        it('should throw exception on malformed input',
            () => {
                const command = 'add'
                action = new AddAction(command);
                expect(() => action.act()).toThrowError('INVALID_INPUT');
            }
        )

        it('should throw exception on malformed input',
            () => {
                const command = 'add test'
                action = new AddAction(command);
                expect(() => action.act()).toThrowError('INVALID_INPUT');
            }
        )
        it('should throw exception on malformed input',
            () => {
                const command = 'add test test test test'
                action = new AddAction(command);
                expect(() => action.act()).toThrowError('INVALID_INPUT');
            }
        )
    }
)

it('should print the help message',
    () => {
        AddAction.printHelp();
        expect(console.log).toHaveBeenCalled();
    }
)
