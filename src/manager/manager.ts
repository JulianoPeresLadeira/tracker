import FileCRUD from "../utils/file-crud";
import StringParser from "../parser/string.parser";
import Parser from "../parser/parser";
import TrackedList from "../models/tracked-list.model";
import Entry from "../models/entry.model";

export default class TrackedListManager {

    private static crud: FileCRUD = new FileCRUD();
    private static parser: Parser<string> = new StringParser();

    public static createTrackedList(listName: string): void {

        const trackedList: TrackedList = new TrackedList();
        const marshalledList = TrackedListManager.parser.marshall(trackedList);

        TrackedListManager.crud.create(listName, marshalledList);
    }

    public static deleteTrackedList(listName: string): void {
        TrackedListManager.crud.delete(listName);
    }

    public static addEntryToTrackedList(listName: string, entryData: string): void {
        const getTrackedList:(() => TrackedList) = () => {
            const list: string = TrackedListManager.crud.read(listName);
            const trackedList: TrackedList = TrackedListManager.parser.unmarshall(list);
            
            return trackedList;
        }
        const getNewEntryIndex: ((list: TrackedList) => number) = (list) => {
            return list.entries.length;
        }
        const updateTrackedList: ((list: TrackedList) => void) = list => {
            const marshalledList = TrackedListManager.parser.marshall(trackedList)
            TrackedListManager.crud.update(listName, marshalledList);
        }

        const trackedList = getTrackedList();
        const entry = new Entry();
        entry.data = entryData;
        entry.index = getNewEntryIndex(trackedList);
        trackedList.entries.push(entry);
        updateTrackedList(trackedList);
    }

    public static getTrackedListData(listName: string): Array<string> {
        const getData: (() => TrackedList) = () => {
            const marshalledData = TrackedListManager.crud.read(listName);
            return TrackedListManager.parser.unmarshall(marshalledData);
        }

        const list = getData();
        return list.entries.map((entry: Entry) => `${entry.index} - ${entry.data}`);
    }
}
