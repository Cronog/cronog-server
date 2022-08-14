import { Response } from "../types/response";
import firebaseadmin from "firebase-admin";

export const requireAuth = async (req, res, next) => {
    const token = req.headers.tokenauth;

    if(token){
        try {
            await firebaseadmin.auth().verifyIdToken(token)
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