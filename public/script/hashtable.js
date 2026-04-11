
const Command = {
    help: {
        run: helpCommand,
        description: `This command will give you all the list of command with short description`
    },
    clear: {
        run: clearCommand,
        description: `This command will clear the terminal`
    },
    exit: {
        run: exitCommand,
        description: `This command will exit the terminal`
    },
    mkdir: {
        run: createFolder,
        description: `This command will create a folder`
    },
    cd: {
        run: changeDirectory,
        description: `This command will change the desired directory`
    },
    mv: {
        run: moveFolder,
        description: `This command will let you move the directory/file to new directory or to rename the directory/file`
    }
};

export  {Command};