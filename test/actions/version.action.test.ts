import VersionAction from "../../src/actions/version.action"
import Errors from "../../src/actions/utils/errors";

let action: VersionAction;

beforeEach(
    () => {
        console.log = jest.fn();
        jest.spyOn(process, 'exit').mockImplementation();
    }
)

it('should call console.log',
    () => {
        const command = 'version'
        action = new VersionAction(command);
        action.act();
        expect(console.log).toHaveBeenCalled();
    }
)

it('should call console.log',
    () => {
        const command = '-v'
        action = new VersionAction(command);
        action.act();
        expect(console.log).toHaveBeenCalled();
    }
)

it('should throw invalid input error',
    () => {
        const errorMessage = Errors.getErrorMessage('INVALID_INPUT', '-v', ['test'])
        const command = '-v test'
        action = new VersionAction(command);
        action.act();
        expect(console.log).toHaveBeenCalledWith(errorMessage);
    }
)
