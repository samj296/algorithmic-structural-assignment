import { Command } from "./hashtable.js";

const terminalOutput = document.getElementById("terminal-output");
const cmdInput = document.getElementById("command");
const form = document.getElementById("terminal-input");

form.addEventListener("submit", cmdIdentify)

function cmdIdentify(event){
    event.preventDefault(); // this will stop from refresh inside a form.
    const input = cmdInput.value.trim().split(" ");
    const cmd = input.shift();
    const actionText = input.join(" ").trim();

    if(Command[cmd]){
        Command[cmd].run(actionText);
    }else{
        terminalOutput.value += `Unknown command: ${cmd} \n`;
    };

    cmdInput.value = ""; //command line cleared here
};