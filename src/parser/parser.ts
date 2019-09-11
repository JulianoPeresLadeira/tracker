import TrackedList from "../models/tracked-list.model";
import TrackedListManager from "../manager/manager";

export default abstract class Parser<T> {

    public abstract marshall(list: TrackedList): T;
    public abstract unmarshall (data: T): TrackedList;

}
