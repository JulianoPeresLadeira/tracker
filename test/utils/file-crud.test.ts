import FileCRUD from "../../src/utils/file-crud";
import TestingUtils from "../src/testing.utils";

import * as fs from 'fs';
import * as path from 'path';

const createdFiles: Array<string> = [];
const createdFolders: Array<string> = [];

describe('Crud Operations',
    () => {

        it('should create data folder',
            () => {
                const defaultFilePath = FileCRUD.filePath;
                const newPath = TestingUtils.generateRandomStringWithLength(10);
                FileCRUD.filePath = newPath;
                const crud = new FileCRUD();
                expect(fs.existsSync(newPath)).toBeTruthy();
                createdFolders.push(newPath);
                FileCRUD.filePath = defaultFilePath;
            }
        )

        it('should create a file',
            () => {
                const fileCRUD = new FileCRUD();
                const randomName = TestingUtils.generateRandomStringWithLength(15);
                const randomString = TestingUtils.generateRandomStringWithLength(50);
                fileCRUD.create(randomName, randomString);
                const folderContents = fs.readdirSync(FileCRUD.filePath)
                expect(folderContents.some(fileName => fileName == `${randomName}.${FileCRUD.fileType}`)).toBeTruthy();
                createdFiles.push(path.join(FileCRUD.filePath, `${randomName}.${FileCRUD.fileType}`));
            }
        )

        it('should read the contents of the file correctly',
            () => {
                const fileCRUD = new FileCRUD();
                const randomFileName = TestingUtils.generateRandomStringWithLength(15);
                const filePath = path.join(FileCRUD.filePath, randomFileName);
                const randomString = TestingUtils.generateRandomStringWithLength(50);
                fs.writeFileSync(`${filePath}.${FileCRUD.fileType}`, randomString);
                createdFiles.push(`${filePath}.${FileCRUD.fileType}`);
                expect(randomString).toEqual(fileCRUD.read(randomFileName));
            }
        )

        it ('should update a file',
            () => {
                const fileCRUD = new FileCRUD();
                const randomFileName = TestingUtils.generateRandomStringWithLength(15);
                const filePath = path.join(FileCRUD.filePath, randomFileName);
                fs.writeFileSync(`${filePath}.${FileCRUD.fileType}`, '{}');
                createdFiles.push(`${filePath}.${FileCRUD.fileType}`);
                const randomData = TestingUtils.generateRandomStringWithLength(50);
                fileCRUD.update(randomFileName, randomData);
                expect(randomData).toEqual(fs.readFileSync(`${filePath}.${FileCRUD.fileType}`, 'utf8'));
                fileCRUD.update(randomFileName, randomData);
                expect(randomData).toEqual(fs.readFileSync(`${filePath}.${FileCRUD.fileType}`, 'utf8'));
                fileCRUD.update(randomFileName, `${randomData}${randomData}`);
                expect(`${randomData}${randomData}`).toEqual(fs.readFileSync(`${filePath}.${FileCRUD.fileType}`, 'utf8'));
            }
        )

        it ('should delete a file',
            () => {
                const fileCRUD = new FileCRUD();
                const randomFileName = TestingUtils.generateRandomStringWithLength(15);
                const filePath = path.join(FileCRUD.filePath, randomFileName);
                fs.writeFileSync(`${filePath}.${FileCRUD.fileType}`, '{}');
                createdFiles.push(`${filePath}.${FileCRUD.fileType}`);
                fileCRUD.delete(randomFileName);
                const folderContents = fs.readdirSync(FileCRUD.filePath);
                expect(folderContents.every(fileName => fileName != `${filePath}.${FileCRUD.fileType}`)).toBeTruthy();
            }
        )

        afterAll(
            () => {
                createdFolders
                    .filter(fs.existsSync)
                    .forEach(fs.rmdirSync)
                

                createdFiles
                    .filter(fs.existsSync)
                    .forEach(fs.unlinkSync)
            }
        )
    }
)