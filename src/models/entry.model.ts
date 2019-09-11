import { Moment } from "moment";
import moment = require("moment");

export default class Entry {

    public index: number = NaN;
    public data: string = '';
    public timestamp: string = moment().format();

}
