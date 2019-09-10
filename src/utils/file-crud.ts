import * as path from 'path';
import * as fs from 'fs';

export default class FileCRUD {

    public static filePath: string = 'data';
    public static fileType: string = 'json';

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

    public create(fileName: string): void {
        const fileExists = (filePath) =>  fs.existsSync(filePath);

        const filePath = `${path.join(FileCRUD.filePath, fileName)}.${FileCRUD.fileType}`;

        if (fileExists(filePath)) {
            throw new Error('FILE_ALREADY_EXISTS');
        }

        fs.writeFileSync(filePath, '');
    }

    public read() {

    }

    public update() {

    }

    public delete() {

    }

}
