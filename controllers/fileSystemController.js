const fsLogic = require("../backendLogic/fileSystemLogic");

exports.createRoot = async(req, res) => {
    let {rootName} = req.body
    const root = fsLogic.createRoot(rootName)
};

exports.getRoot = async(req, res) => {
    const root = req.session.root;
    if(!root){
        return res.status(500).json({
            success: false,
            message: "Filesystem failed to initialized"
        });
    }
    return res.status(200).json({
        success: true,
        root
    })
};

exports.createFolder = async(req, res) => {
    let {name, path} = req.body;
    const root = req.session.root;
    //here parent will recieve as folder path have to 
    // create a function to grab the node from that path
    const parent = fsLogic.findParentByPath(root,path);
    if(!parent) return res.status(400).json({error: "Invalid path"});

   const node = fsLogic.createFolder(parent, name);
    res.status(200).json({
        success: true,
        message: "Folder created",
        path: `${path}/${node.name}`
    });
};

exports.moveFolder = async(req, res) => {
    try{
        const {newPath, oldPath} = req.body;
        if(!newPath || !oldPath){
            return res.status(400).json({
                success: false,
                message: "Both new path and old path are required"
            });
        };
        const root = req.session.root;
        if(!root){
            return res.status(500).json({
                success: false,
                message: "Filesystem not initialized"
            });
        };
        fsLogic.moveFolder(newPath,oldPath, root);
        // updating the root in the session
        req.session.root = root;
        return res.status(200).json({
            success: true,
            message: "Folder moved successfully",
            from: oldPath,
            to: newPath
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message || "Unable to move folder"
        });
    };
};

exports.changeDirectory = async(req, res) => {
    const root = req.session.root;
    const target = req.body.path;

    const node = fsLogic.findNodeByPath(root, target);
    if(!node){
        return res.status(400).json({error: "Invalid path"});
    };
    req.session.currentPath = target;
    res.status(200).json({path: target});
};