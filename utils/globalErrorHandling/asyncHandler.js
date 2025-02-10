

const asyncHandler = (fn) => (req,res,next)=>{
    fn(req,res,next).catch((err) => {
        return next(err);
    });
}

export default asyncHandler;