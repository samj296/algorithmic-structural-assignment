import {helpCommand, clearCommand, exitCommand, createFolder, moveFolder, changeDirectory, runBfs, runDFS} from "./function.js"

const terminalOutput = document.getElementById("terminal-output");

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
        description: `Exit the terminal (logout)`
    },

    mkdir: {
        description: `Creates a new folder`,
        run(args) {
            terminalOutput.value += args + "\n";
            const name = args.trim();
            const currentPath = document.getElementById("user-folder-location").innerText;
            createFolder(name, currentPath);
        }
    },

    cd: {
        description: `Change directory`,
        async run(args) {
            return await changeDirectory(args.trim());
        }
    },

    mv: {
        description: `Moves a folder/file`,
        run(args) {
            terminalOutput.value += args + "\n";
            const [oldPath, newPath] = args.split(" ");
            moveFolder(oldPath, newPath);
        }
    },

    bfs: {
        run(){
            terminalOutput.value += "bfs \n";
            runBfs()
        },
        description: `Convert N-ary tree to binary tree and run BFS`
    },

    dfs: {
        run(){
            terminalOutput.value += "dfs \n";
            runDFS();
        },
        description: `Convert N-ary tree to binary tree and run DFS`
    }
};



export  {Command};