export default class Errors {

    public static getErrorMessage(error: string, actionIdentifier: string, parameters: Array<string>) {
        
        const errorMessages = {
            INVALID_INPUT : `Input not recognized. The command 'help' shows you all possible actions.`,
            FILE_ALREADY_EXISTS : `List ${parameters[0]} already exists.`,
            FILE_NOT_FOUND: `List ${parameters[0]} does not exist.`,
            ACTION_NOT_FOUND: `Action '${actionIdentifier}' is unknown. The command 'help' shows a list of every command.`,
            MISSING_PARAMETER: `Action requires a parameter, which was not informed.`
        }
       
        const errorMessage: string = errorMessages[error] || 'An unknown error has ocurred';
        
        return errorMessage;
    }

    public static exitWithError(errorMessage: string) {
        throw errorMessage;
    }
}
