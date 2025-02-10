import jwt from 'jsonwebtoken';


const verifying = async ({ token, SECRET_KEY, next }) => {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded?.email)
        return next(new Error("invalid token payload", { cause: 400 }));
    return decoded;
}

export default verifying;