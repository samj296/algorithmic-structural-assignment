import {Command} from "./hashtable.js";
import {api} from "./fetch.js"
import {createBinaryTree, dfs, bfs} from "./dsa.js"


function termianlResponse(options = {}){
    return {
        print: false,
        printText: "",

        updatePath: false,
        updateText: "",

        error: false,
        errorText: "",

        clear: false,
        ...options
    };
};
function helpCommand(){
    let output = "\nCommands:\n"
    for(const key of Object.keys(Command)){
        output += `${key} - ${Command[key].description}\n`;
    };
    return termianlResponse(
        {
        print: true,
        printText: output,
    }
    ); 
};

function clearCommand(){
    
    return termianlResponse({clear: true}); 
};

async function exitCommand(){

    const data = await api("/logout", {method:"POST"});
    if(data.redirect){
        window.location.href = data.redirect;
        return termianlResponse({});
    };

    // Fallback if the expected response is missing
    window.location.href = "/";
    return termianlResponse({});
};

async function createFolder(name, path){
    const data = await api("/fs/create",{
        method: "POST",
        body:JSON.stringify({name, path})
    });
    
    if(!data)return termianlResponse({
        error: true,
        errorText:"Unable to create folder"
    });
    return termianlResponse({
        print: true,
        printText: `folder created ${data.path}`,
    });
};

async function moveFolder(oldPath, newPath, name){
    //const {newPath, oldPath} = req.body; backend pattern
    const data = await api("/fs/move",{
        method: "POST",
        body:JSON.stringify({oldPath, newPath})
    });
    let errorMessage = null;
    if(!data){
        errorMessage = "unable to move folder"
        return termianlResponse({
            error: true,
            errorText: errorMessage
        });
    };
        
    if (data.success){
        return termianlResponse({
            print: true,
            printText: `File Moved to ${data.to} `,
        });
    }else {
        if(data.message){
            errorMessage = data.message;
        }else{
            errorMessage = "Unable to move folder";
        };
        return termianlResponse({
            error: true,
            errorText: errorMessage,
        });
    };

};

async function getTree(){
    const data = await api("/fs/root",{
        method: "GET",
    });
    let errorMessage = "";
    if(!data) {
        errorMessage = "Unable to get root";
        return termianlResponse({
            error: true,
            errorText: errorMessage
        })
    };
    if(data.success){
        return data.root
    }else{
        if(!data.message) errorMessage = "Unable to fetch the tree";
        return termianlResponse({
            error: true,
            errorText: errorMessage
        });
    };
};


async function changeDirectory(directory){
    const path = document.getElementById("user-folder-location"); //parent folder will be in this path
    if(!directory){
        return termianlResponse({
            print: true,
            printText: `Invalid directory`
        });
        
    };
    let data = null;
    if(directory === ".."){ // if its not root go to parent folder
        const pathArray = path.innerText.split("/").filter(Boolean);
        pathArray.pop()
        const parentPath = `/${pathArray.join("/")}`
        data = await api("/fs/cd",{
        method: "POST",
        body: JSON.stringify({path: parentPath})
       });
    }else if(directory.startsWith("/")){ // if directory start with "/" then its an absolute path 
        data = await api("/fs/cd",{
            method: "POST",
            body: JSON.stringify({path:directory})
        });
    }else{ //it means it just folder name from the children list
        data = await api("/fs/cd",{
            method: "POST",
            body: JSON.stringify({path: `${path.innerText}/${directory}`})
        });
    }; 

    if(data.error){
        return termianlResponse({
            error: true,
            errorText: `invalid path: ${directory}\n`
        });
    };
    
    return termianlResponse({
        updatePath:true,
        updateText: data.path
    });

};

async function runBfs(){
    const root = await getTree()
    if(root.error) return root; // error from getTree will be preserved in root with proper format

    let output = "";
    output += `converting non binary tree to binary tree \n ${createBinaryTree.toString()}\n`;
    const binaryTree = createBinaryTree(root);
    output += `Running bfs to print out the folder name \n ${bfs.toString()} \n`;
    output += bfs(binaryTree);
    return termianlResponse({
        print: true,
        printText: output
    });
};

async function runDFS(){
    const root = await getTree()
    if(root.error) return root; // error from getTree will be preserved in root with proper format 
    let output = "";
    output += `converting non binary tree to binary tree \n ${createBinaryTree.toString()}\n`;
    const binaryTree = createBinaryTree(root);
    output += `Running DFS to print out the folder name \n ${dfs.toString()}\n`;
    output += dfs(binaryTree);
    return termianlResponse({
        print: true,
        printText: output
    });
};

export {helpCommand, clearCommand, exitCommand, createFolder, moveFolder, getTree, changeDirectory, runBfs, runDFS};