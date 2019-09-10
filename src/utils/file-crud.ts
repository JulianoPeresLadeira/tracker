import * as path from 'path';
import * as fs from 'fs';

export default class FileCRUD {

    public static filePath: string = 'data';
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
        fs.mkdirSync(FileCRUD.filePath);        
    }

    private fileExists(filePath: string): boolean {
        return fs.existsSync(filePath);
    }

    private buildPath(fileName: string): string {
        return `${path.join(FileCRUD.filePath, fileName)}.${FileCRUD.fileType}`;
    }

    public create(fileName: string): void {
        const filePath = this.buildPath(fileName);

        if (this.fileExists(filePath)) {
            throw new Error('FILE_ALREADY_EXISTS');
        }

        fs.writeFileSync(filePath, '{}');
    }

    public read(fileName: string): string {
        const filePath = this.buildPath(fileName);

        if (!this.fileExists(filePath)) {
            throw new Error('FILE_NOT_FOUND');
        }

        return fs.readFileSync(filePath, FileCRUD.encoding);
    }

    public update(fileName: string, data: string): void {
        const filePath = this.buildPath(fileName);

        if (!this.fileExists(filePath)) {
            throw new Error('FILE_NOT_FOUND');
        }

        fs.writeFileSync(filePath, data);
    }

    public delete(fileName: string): void {
        const filePath = this.buildPath(fileName);
        
        if (!this.fileExists(filePath)) {
            throw new Error('FILE_NOT_FOUND');
        }

        fs.unlinkSync(filePath);
    }
}
