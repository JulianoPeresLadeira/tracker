export default class Validations {

    public static singleParameterCommandValidation(command: string) {
        return () => {
            let errors: Array<string> = [];
            
            const splitCommand = command.split(' ');
            splitCommand.shift();
            
            if (splitCommand.length !== 1) {
                errors.push('INVALID_INPUT');
            }
                
            return errors;
        }
    }

    public static noParameterCommandValidation(command: string) {
        return () => {
            let errors: Array<string> = [];
            
            const splitCommand = command.split(' ');
            
            if (splitCommand.length !== 1) {
                errors.push('INVALID_INPUT');
            }
                
            return errors;
        }
    }
}
