import Parser from "./parser";
import TrackedList from "../models/tracked-list.model";

export default class StringParser extends Parser<string> {
    public marshall(list: TrackedList): string {
        return JSON.stringify(list);
    }

    public unmarshall (data: string): TrackedList {
        return JSON.parse(data);
    }
}
