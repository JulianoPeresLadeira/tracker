import StringParser from "../../src/parser/string.parser";
import TrackedList from "../../src/models/tracked-list.model";
import moment = require("moment");
import Entry from "../../src/models/entry.model";

const parser: StringParser = new StringParser();

jest.mock('moment', () => () => ({format: () => '2019–01–01T00:00:00+00:00'}));

it('should marshall list correctly',
    () => {
        const table = new TrackedList();
        expect(parser.marshall(table)).toEqual(`{"entries":[],"timestamp":"2019–01–01T00:00:00+00:00"}`);
        const entry = new Entry();
        entry.index = 0;
        entry.data = 'this is a test';
        table.entries.push(entry);
        expect(parser.marshall(table)).toEqual(`{"entries":[{"index":0,"data":"this is a test","timestamp":"2019–01–01T00:00:00+00:00"}],"timestamp":"2019–01–01T00:00:00+00:00"}`);
    }
)

it('should unmarshall list correctly',
    () => {
        let marshalledList = `{"entries":[],"timestamp":"2019–01–01T00:00:00+00:00"}`;
        let trackedList = parser.unmarshall(marshalledList);
        expect(trackedList.entries.length).toBe(0);
        expect(trackedList.timestamp).toEqual("2019–01–01T00:00:00+00:00");
        marshalledList = `{"entries":[{"index":0,"data":"this is a test","timestamp":"2019–01–01T00:00:00+00:00"},{"index":1,"data":"this is a test","timestamp":"2019–01–01T00:00:00+00:00"}],"timestamp":"2019–01–01T00:00:00+00:00"}`;
        trackedList = parser.unmarshall(marshalledList);
        expect(trackedList.entries.length).toBe(2);
        expect(trackedList.entries.every(
            (entry, index) => entry.data === "this is a test" && entry.index === index
        )).toBeTruthy();
    }
)
