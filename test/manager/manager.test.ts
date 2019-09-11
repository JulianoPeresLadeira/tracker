import TrackedListManager from "../../src/manager/manager";
import FileCRUD from "../../src/utils/file-crud";
import Entry from "../../src/models/entry.model";

jest.mock('moment', () => () => ({format: () => '2019–01–01T00:00:00+00:00'}));

let createFn = FileCRUD.prototype.create = jest.fn();
let deleteFn = FileCRUD.prototype.delete = jest.fn();
let updateFn = FileCRUD.prototype.update = jest.fn();
let readFn = FileCRUD.prototype.read = jest.fn();

it('should call the create of crud',
    () => {
        TrackedListManager.createTrackedList('test');
        expect(createFn).toHaveBeenCalledWith('test', `{"entries":[],"timestamp":"2019–01–01T00:00:00+00:00"}`);
        expect(createFn).toHaveBeenCalledTimes(1);
    }
);

it('should delete the tracked list',
    () => {
        TrackedListManager.deleteTrackedList('test');
        expect(deleteFn).toHaveBeenCalledWith('test');
        expect(deleteFn).toHaveBeenCalledTimes(1);
    }
);

it('should update the tracked list',
    () => {
        readFn = FileCRUD.prototype.read = jest.fn(listName => `{"entries":[],"timestamp":"2019–01–01T00:00:00+00:00"}`);

        TrackedListManager.addEntryToTrackedList('test', 'Teste');
        expect(updateFn).toHaveBeenCalledTimes(1);
    }
)

it('should return formatted entries',
    () => {
        readFn = FileCRUD.prototype.read = jest.fn(listName => `{"entries":[{"index":0,"data":"this is a test","timestamp":"2019–01–01T00:00:00+00:00"},{"index":1,"data":"this is a test","timestamp":"2019–01–01T00:00:00+00:00"}],"timestamp":"2019–01–01T00:00:00+00:00"}`);

        const data = TrackedListManager.getTrackedListData('test');
        expect(readFn).toHaveBeenCalledTimes(1);
        expect(data.length).toBe(2);
        data.forEach(
            (entryData: string, index) => {
                expect(entryData.startsWith(`${index}`)).toBeTruthy();
            }
        )
    }
)