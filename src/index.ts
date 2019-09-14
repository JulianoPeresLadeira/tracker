#!/usr/bin/env node

import Action from "./actions/action";
import routes from "./routes";
import Errors from "./actions/utils/errors";

const removeDefaultProcessArguments = () => {
    // Remove node location
    process.argv.shift();
    // Remove index.js location
    process.argv.shift();
}
const formatArguments = (args) => args.join(' ').split(' ').join(' ');
const getAction = (programArguments) => {
    const action = programArguments.split(' ')[0];
    return action;
}
const createAction: ((actionIdentifier: string, args: Array<string>) => Action) = (actionIdentifier, args) => {
    if (routes.hasOwnProperty(actionIdentifier)) {
        return new routes[actionIdentifier](args);
    }

    Errors.exitWithError(Errors.getErrorMessage('ACTION_NOT_FOUND', actionIdentifier, args));
}

removeDefaultProcessArguments();
const args = formatArguments(process.argv);
const actionIdentifier = getAction(args);
const action = createAction(actionIdentifier, args);

action.act();