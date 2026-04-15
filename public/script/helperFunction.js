/*  Helper Function  */
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


export {termianlResponse, normalizePath};