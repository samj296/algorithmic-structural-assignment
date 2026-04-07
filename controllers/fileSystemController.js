const fsLogic = require("../backendLogic/fileSystemLogic");

exports.createFolder = async(req, res) => {
    let {name, parent} = req.body;
    //here parent will recieve as folder path have to 
    // create a function to grab the node from that path
    fsLogic.createFolder(parent, name);
};

exports.moveFolder = async(req, res) => {

};