import { Command } from "./hashtable";
import { api } from "./fetch";

const terminalOutput = document.getElementById("terminal-output");
const cmdInput = document.getElementById("command");
const path = document.getElementById("user-folder-location");

cmdInput.addEventListener("submit", cmdIdentify)

function cmdIdentify(event){
    event.preventDefault(); // this will stop from refresh inside a form.
    const input = cmdInput.value.trim().split(" ");
    const cmd = input.shift();
    const actionText = input;

    if(Command[cmd]){
        Command[cmd].run(actionText);
    }else{
        terminalOutput.value += `Unknown command: ${cmd} \n`;
    };

    cmdInput.value = ""; //command line cleared here
};