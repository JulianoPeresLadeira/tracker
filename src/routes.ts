import AddAction from "./actions/add.action";
import CreateAction from "./actions/create.action";
import ViewAction from "./actions/view.action";

const routes: any = {
    'add': AddAction,
    'create': CreateAction,
    'view': ViewAction
}

export default routes;