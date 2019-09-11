import Entry from "./entry.model";
import { Moment } from "moment";
import moment = require("moment");

export default class TrackedList {

    public entries: Array<Entry> = [];
    public timestamp: string = moment().format();
}
