import { getAuth } from "firebase-admin/auth";
import { Response } from "../types/response";

export const requireAuth = async (req, res, next) => {
    const token = req.headers["token-auth"];

    if(token){
        try {
            await getAuth().verifyIdToken(token)
            next()
        } catch (error) {
            res.send({
                status: 401,
                message: "token expirado",
                success: false
            } as Response)
        }
    }else{
        res.send({
            status: 403,
            success: false
        } as Response)
    }     
}

export default requireAuth;