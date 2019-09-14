import ShowAction from "../../src/actions/show.action"
import TrackedListManager from "../../src/manager/manager";
import Errors from "../../src/actions/utils/errors";

let action: ShowAction;
let target: Function;

beforeEach(
    () => {
        target = TrackedListManager.getListNames = jest.fn(() => ['test']);
        console.log = jest.fn();
        jest.spyOn(process, 'exit').mockImplementation();
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

it('should throw error because too many parameters',
    () => {
        const errorMessage = Errors.getErrorMessage('INVALID_INPUT', 'view', ['lists', 'and', 'throw', 'error', 'please']);
        const command = 'show lists and throw error please';
        action = new ShowAction(command);
        action.act();
        expect(console.log).toHaveBeenCalledWith(errorMessage);
    }
)

it('should throw error because too few parameters',
    () => {
        const errorMessage = [Errors.getErrorMessage('MISSING_PARAMETER', 'view', []), Errors.getErrorMessage('INVALID_INPUT', 'view', [])].join('\n');
        const command = 'show';
        action = new ShowAction(command);
        action.act();
        expect(console.log).toHaveBeenCalledWith(errorMessage);
    }
)
