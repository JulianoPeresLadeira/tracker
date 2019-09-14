export default class Commons {
    public static getParameter(command: string): string {
        return command.split(' ')[1];
    } 
}
