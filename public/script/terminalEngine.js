import { Command } from "./hashtable.js";

const terminalOutput = document.getElementById("terminal-output");
const cmdInput = document.getElementById("command");
const form = document.getElementById("terminal-input");
const drive = document.getElementById("drive")
const currentLocation = document.getElementById("user-folder-location");

form.addEventListener("submit", cmdIdentify)

async function cmdIdentify(event){
    event.preventDefault(); // this will stop from refresh inside a form.
    terminalOutput.value += `${drive.innerText} ${currentLocation.innerText} ${cmdInput.value} \n`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight; //got this from the copilot this will always show the new line
    const input = cmdInput.value.trim().split(" ");
    const cmd = input.shift();
    const actionText = input.join(" ").trim();

    /*  all function will return an object 
     {
        print: true/false, 
        printText, 
        
        updatePath: true/false, 
        updateText

        error: true/false,
        errorText,

        clear: true/false
    }
    */
    cmdInput.value = ""; //command line cleared here
    let funResponse = null
    
    if(Command[cmd]){
        funResponse = await Command[cmd].run(actionText);
    }else{
        terminalOutput.value += `Unknown command: ${cmd} \n`;
    };

   

    if(funResponse && funResponse.error){
        terminalOutput.value += `${funResponse.errorText} \n`;
        return;
    }

    //clear output terminal
    if(funResponse && funResponse.clear){
     terminalOutput.value = "";
     return
    }

    // printing in output teriminal
    if(funResponse && funResponse.print) terminalOutput.value += `${funResponse.printText} \n`;
    
    // updating path
    if(funResponse && funResponse.updatePath) currentLocation.innerText = funResponse.updateText;
    
    terminalOutput.scrollTop = terminalOutput.scrollHeight; //got this from the copilot this will always show the new line

};