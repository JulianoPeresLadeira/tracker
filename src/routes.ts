import AddAction from "./actions/add.action";
import CreateAction from "./actions/create.action";
import ViewAction from "./actions/view.action";
import DeleteAction from "./actions/delete.action";
import HelpAction from "./actions/help.action";
import ShowAction from "./actions/show.action";
import VersionAction from "./actions/version.action";

export default class Routes {
    public static add = AddAction;
    public static create = CreateAction;
    public static delete = DeleteAction;
    public static help = HelpAction;
    public static show = ShowAction;
    public static version = VersionAction;
    public static view = ViewAction;
}
