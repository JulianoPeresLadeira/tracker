import VersionAction from "../../src/actions/version.action"

let action: VersionAction;

beforeEach(
    () => {
        console.log = jest.fn();
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
        const command = '-v test'
        action = new VersionAction(command);
        expect(() => action.act()).toThrowError('INVALID_INPUT');
    }
)


it('should print the help message',
    () => {
        VersionAction.printHelp();
        expect(console.log).toHaveBeenCalled();
    }
)

