

const asyncHandler = (fn) => (req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch((err) => {
        return next(err);
    });
}

export default asyncHandler;