const FSmodels = require("../models/FileSystem");

exports.createFolder = async(req, res) => {
    let {name, parent} = req.body;
    //here parent will recieve as folder path have to 
    // create a function to grab the node from that path
    FSmodels.createFolder(parent, name);
};