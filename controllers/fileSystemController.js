const fsLogic = require("../backendLogic/fileSystemLogic");

exports.createRoot = async(req, res) => {
    let {rootName} = req.body
    const root = fsLogic.createRoot(rootName)
};

exports.createFolder = async(req, res) => {
    let {name, path} = req.body;
    const root = req.session.root;
    //here parent will recieve as folder path have to 
    // create a function to grab the node from that path
    const parent = fsLogic.findParentByPath(root,path);
    if(!parent) return res.status(400).send("Invalid path");

   const node = fsLogic.createFolder(parent, name);
    res.status(200).send(`${path} /${node.name}`)
};

exports.moveFolder = async(req, res) => {

};