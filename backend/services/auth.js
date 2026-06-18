import jwt from "jsonwebtoken";
export const setUser = (user) => {
    const tokenData = {
        userId : user._id,
    }

    const token = jwt.sign(tokenData,process.env.SECRET_KEY);

    return token;
}

export const getUser = (token) => {
    if(!token) return null;

    const user = jwt.verify(token,process.env.SECRET_KEY);

    return user;
}