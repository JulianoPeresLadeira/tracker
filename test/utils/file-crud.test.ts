import FileCRUD from "../../src/utils/file-crud";
import TestingUtils from "../src/testing.utils";

import * as fs from 'fs';
import * as path from 'path';

describe('Crud Operations',
    () => {

        it('should create data folder',
            () => {
                const defaultFilePath = FileCRUD.filePath;
                const newPath = TestingUtils.generateRandomStringWithLength(10);
                FileCRUD.filePath = newPath;
                const crud = new FileCRUD();
                expect(fs.existsSync(newPath)).toBeTruthy();
                fs.rmdirSync(newPath);
                FileCRUD.filePath = defaultFilePath;
            }
        )

        it('should create a file',
            () => {
                const fileCRUD = new FileCRUD();
                const randomName = TestingUtils.generateRandomStringWithLength(15);
                fileCRUD.create(randomName);
                const folderContents = fs.readdirSync(FileCRUD.filePath)
                expect(folderContents.some(fileName => fileName == `${randomName}.${FileCRUD.fileType}`)).toBeTruthy();
                // fs.unlinkSync(path.join(FileCRUD.filePath, `${randomName}.${FileCRUD.fileType}`));
            }
        )

        it ('should delete a file',
            () => {
                expect(true).toBeTruthy();
            }
        )

        it ('should update a file',
            () => {
                expect(true).toBeTruthy();
            }
        )

        it('should delete a file',
            () => {
                expect(true).toBeTruthy();
            }
        )
    }
)