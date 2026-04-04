class TreeNode{
    constructor(value){
        this.value = value;
        this.type = null
        this.children = [];
        this.parent = null;
    };
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


function filePath(node, path){
    if(!node) return;
    let i = 0 ;
    const obj = [];
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

module.exports = {TreeNode, filePath}