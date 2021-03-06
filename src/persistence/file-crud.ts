import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Errors from '../actions/utils/errors';

export default class FileCRUD {

    public static filePath: string = path.join(os.homedir(), 'tracker', 'data');
    public static fileType: string = 'json';
    public static encoding: string = 'utf8';

    constructor() {
        if (!this.filePathExists()) {
            this.createFilePath();
        }
    }

    private filePathExists(): boolean {
        return fs.existsSync(FileCRUD.filePath);
    }

    private createFilePath(): void {
        fs.mkdirSync(FileCRUD.filePath, { recursive: true });
    }

    private fileExists(filePath: string): boolean {
        return fs.existsSync(filePath);
    }

    private buildPath(fileName: string): string {
        return `${path.join(FileCRUD.filePath, fileName)}.${FileCRUD.fileType}`;
    }

    public create(fileName: string, data: string): void {
        const filePath = this.buildPath(fileName);

        if (this.fileExists(filePath)) {
            const errorMessage = Errors.getErrorMessage('FILE_ALREADY_EXISTS', 'create', [fileName])
            Errors.exitWithError(errorMessage);
        }

        fs.writeFileSync(filePath, data);
    }

    public read(fileName: string): string {
        const filePath = this.buildPath(fileName);

        if (!this.fileExists(filePath)) {
            const errorMessage = Errors.getErrorMessage('FILE_NOT_FOUND', 'view', [fileName])
            Errors.exitWithError(errorMessage);
        }

        return fs.readFileSync(filePath, FileCRUD.encoding);
    }

    public update(fileName: string, data: string): void {
        const filePath = this.buildPath(fileName);

        if (!this.fileExists(filePath)) {
            const errorMessage = Errors.getErrorMessage('FILE_NOT_FOUND', 'update', [fileName])
            Errors.exitWithError(errorMessage);

        }

        fs.writeFileSync(filePath, data);
    }

    public delete(fileName: string): void {
        const filePath = this.buildPath(fileName);

        if (!this.fileExists(filePath)) {
            const errorMessage = Errors.getErrorMessage('FILE_NOT_FOUND', 'delete', [fileName])
            Errors.exitWithError(errorMessage);
        }

        fs.unlinkSync(filePath);
    }

    public getListNames(): Array<string> {
        const getListName = (fileName) => {
            const splitFileName = fileName.split('.');
            splitFileName.pop();
            return splitFileName.join('.');
        }
        return fs.readdirSync(FileCRUD.filePath).map(getListName);
    }
}
