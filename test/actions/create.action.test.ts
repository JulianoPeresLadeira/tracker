import TrackedListManager from "../../src/manager/manager"
import CreateAction from "../../src/actions/create.action"

let action: CreateAction;
let target: Function;

beforeEach(
    () => {
        target = TrackedListManager.createTrackedList = jest.fn();
        console.log = jest.fn();
    }
)

it('should call create list with passed parameter',
    () => {
        const command = 'create test'
        action =  new CreateAction(command);
        action.act();
        expect(target).toHaveBeenCalledWith('test');
    }
)

it('should call create list multiple times',
    () => {
        const command = 'create test1 and test2 and test3'
        action =  new CreateAction(command);
        action.act();
        expect(target).toHaveBeenCalledTimes(3);
        expect(target).toHaveBeenCalledWith('test1');
        expect(target).toHaveBeenCalledWith('test2');
        expect(target).toHaveBeenCalledWith('test3');
    }
)

it('should throw error',
    () => {
        const command = 'create test1 & test2 & test3'
        action =  new CreateAction(command);
        expect(() => action.act()).toThrow('INVALID_INPUT')
    }
)

it('should print the help message',
    () => {
        CreateAction.printHelp();
        expect(console.log).toHaveBeenCalled();
    }
)
