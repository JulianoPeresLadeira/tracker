#!/usr/bin/env node

const removeDefaultProcessArguments = () => {
    // Remove node location
    process.argv.shift();
    // Remove index.js location
    process.argv.shift();
}

const getParameters = (programArguments) => {
    const action = programArguments.shift();
    const targetDatabase = programArguments.pop();
    const targetDatabasePrefix = programArguments.pop();
    const entry = programArguments.join(' ');

    return {action, targetDatabase, entry}
}

removeDefaultProcessArguments();

const executionParameters = getParameters(process.argv)

console.log(executionParameters)
