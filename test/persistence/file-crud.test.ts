import FileCRUD from "../../src/persistence/file-crud";
import TestingUtils from "../src/testing.utils";

import * as fs from 'fs';
import * as path from 'path';
import Errors from "../../src/actions/utils/errors";

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

        it('should throw file already exists error',
            () => {
                const crud = new FileCRUD();
                const originalMethod = FileCRUD.prototype['fileExists'];
                const fileName = TestingUtils.generateRandomStringWithLength(10)
                const errorMessage = Errors.getErrorMessage('FILE_ALREADY_EXISTS', 'create', [fileName]);
                FileCRUD.prototype['fileExists'] = (inp) => true;
                expect(() => crud.create(fileName, '{}')).toThrow(errorMessage)
                FileCRUD.prototype['fileExists'] = originalMethod;
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

        it('should update a file',
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

        it('should delete a file',
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

        it('should return the names of the files correctly',
            () => {

                const originalFilePath = FileCRUD.filePath;
                FileCRUD.filePath = TestingUtils.generateRandomStringWithLength(10);

                fs.mkdirSync(FileCRUD.filePath);
                createdFolders.push(FileCRUD.filePath);

                let filesToCreate = 10;
                let listNames: Array<string> = [];

                while (filesToCreate > 0) {
                    const randomFileName = TestingUtils.generateRandomStringWithLength(15);
                    const filePath = path.join(FileCRUD.filePath, randomFileName);
                    fs.writeFileSync(`${filePath}.${FileCRUD.fileType}`, '{}');
                    createdFiles.push(`${filePath}.${FileCRUD.fileType}`);
                    listNames.push(randomFileName);
                    filesToCreate--;
                }

                const fileCRUD = new FileCRUD();
                const filesFound = fileCRUD.getListNames();
                FileCRUD.filePath = originalFilePath;
                expect(filesFound).toHaveLength(listNames.length);
                listNames.forEach(
                    listName => {
                        expect(filesFound.some(name => name === listName)).toBeTruthy();
                    }
                );
            }
        )

        afterEach(
            () => {
                createdFiles
                    .filter(fs.existsSync)
                    .forEach(fs.unlinkSync)
                createdFolders
                    .filter(fs.existsSync)
                    .forEach(fs.rmdirSync)
            }
        )
    }
)