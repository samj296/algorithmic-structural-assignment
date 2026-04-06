module.exports = (err, req, res, next) => {
    if(res.headerSent) return next(err);

    // if the error is not sent then
    const status = err.status || 500
    console.log("An error has occured ", err);

    res.status(status).json({
        error: err.message || "Something went wrong",
        status
    });
};