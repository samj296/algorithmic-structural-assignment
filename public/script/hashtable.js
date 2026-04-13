import {helpCommand, clearCommand, exitCommand, createFolder, moveFolder, changeDirectory, runBfs, runDFS} from "./function"
const Command = {
    help: {
        run: helpCommand,
        description: `Lists all available commands with description`
    },
    clear: {
        run: clearCommand,
        description: `Clear the terminal`
    },
    exit: {
        run: exitCommand,
        description: `exit the terminal(logout)`
    },
    mkdir: {
        run: createFolder,
        description: `Creates a new folder`
    },
    cd: {
        run: changeDirectory,
        description: `Moves or renames a folder/file`
    },
    mv: {
        run: moveFolder,
        description: `Moves a folder/file`
    },
    bfs: {
        run: runBfs,
        description: `converts non binary tree(directory) and change it to the binary tree and will run the bfs`
    },
    dfs: {
        run: runDFS,
        description: `converts non binary tree(directory) and change it to the binary tree and will run the dfs`
    }
};

export  {Command};