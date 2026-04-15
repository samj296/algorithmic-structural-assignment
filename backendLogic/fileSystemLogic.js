const {TreeNode} = require("../models/FileSystem")

/* Helper function */

function findNodeByPath(root, path){
    // Normalize the path before using it
    path = normalizePath(path);

    if(!path.startsWith(root.value)){
        path = `${root.value}/${path}`
    };

    const pathArray = path.split("/").filter(Boolean); //Boolean will return only the strings that
                                                // undefined and empty string will be ignored

    if(pathArray.length === 1) return root;

    let currentNode = root;

    

    

    for(const name of pathArray.slice(1)){
        const next = currentNode.children.find(child =>child.value === name);
        if(!next) return null;
        currentNode = next;
    };
    return currentNode;
};

function normalizePath(path){
    // Removing leading slashes
    while(path.startsWith("/")){
        path = path.slice(1);
    };

    // Removing the trailing slashes
    while(path.endsWith("/")){
        path = path.slice(0, -1);
    };
    return path;
};


/* ------------------------------------------------------------------------------ */

function createRoot(name){
    let root = new TreeNode(name)

    return root;
};


function createFolder(parent, node){
    // if there is no parent this node will be treated as root
    let newNode = new TreeNode(node)
    if(parent === null){
         return newNode;
    }else{
        parent.children.push(newNode);
        return newNode;
    };
};

function moveFolder(newPath,oldPath, root){
    const oldPathArray = oldPath.split("/");
    const folderName = oldPathArray[oldPathArray.length - 1];
    const oldParentPath = oldPathArray.slice(0,-1).join("/");

    const oldParent = findNodeByPath(root,oldParentPath);
    const newParent = findNodeByPath(root, newPath);
    if(!oldParent || !newParent){
        throw new Error("Invalid path");
    };

    //find the actual node
    const node = oldParent.children.find(child => child.value === folderName);
    if(!node){
        //here I will alert the user or throw new error here
        return;
    };
    //remove from old parent
    oldParent.children = oldParent.children.filter(child => child !== node);
    // add to new parent
    newParent.children.push(node);
    // update parent reference
    node.parent = newParent;
    // no need to return the root as the root is an object this function will modify the original tree itself
    //objects are passed as the reference
};


function findParentByPath(root, path){
    path = normalizePath(path);

    if(!path.startsWith(root.value)){
        path = `${root.value}/${path}`;
    };

    const pathArray = path.split("/").filter(Boolean); //Boolean will return only the strings that
                            // undefined and empty string will be ignored
    // if array has the length of 1 then root is the parent
    if(pathArray.length <= 1) return root;

    const parentPathArray = pathArray.slice(1, pathArray.length-1);

    let currentNode = root;

    for(const name of parentPathArray){
        const nextNode = currentNode.children.find(child => child.value === name);
        if(!nextNode) return null; // invalid path
        currentNode = nextNode
    };

    return currentNode;
};

function filePath(node, path){
    if(!node) return;
    let rootPath = ""
    if(path === `/`){
         rootPath = node.value;
    }else{
        rootPath = `${path}/${node.value}`
    };

    const subFolder = [];

    for(child of node.children){
    
            const folderPath = `${rootPath}/${child.value}`
            const folder_file = {
                path: folderPath,
                type: child.type
            };
            subFolder.push(folder_file);
            
    };

    return subFolder;
};

module.exports = {createRoot, createFolder, moveFolder, filePath, findNodeByPath, findParentByPath};