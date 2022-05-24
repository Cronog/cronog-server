import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { connectFirebaseAuth } from "../connections/firebase";
import { Response } from "../types/response";
import formatMessageError from "./error";

const app = connectFirebaseAuth();
const auth = getAuth(app);

export const singin = async (req) : Promise<Response> => {
    try {
        const response = await signInWithEmailAndPassword(auth, req.body["email"], req.body["password"]);
        return {
            status: 200,
            success: true,
            data: response["user"]
        } as Response
    } catch (error) {
        return {
            status: 500,
            success: false,
            message: formatMessageError(error.code),
            data: error
        } as Response
    }
}

export const register = async (req) : Promise<Response> => {
    try {
        const response = await createUserWithEmailAndPassword(auth, req.body["email"], req.body["password"]);
        return {
            status: 200,
            success: true,
            data: response["user"]
        } as Response
    } catch (error) {
        return {
            status: 500,
            success: false,
            message: formatMessageError(error.code),
            data: error
        } as Response
    }
}

export const sendEmailResetPassword = async (email : string) : Promise<Response> => {
    try {
        await sendPasswordResetEmail(auth, email)
        return({
            status: 200,
            data: {},
            success: true,
            message: "Email de recuperação enviado com sucesso"
        } as Response)
    } catch (error) {
        return {
            status: 500,
            success: false,
            message: formatMessageError(error.code),
            data: error
        } as Response   
    }
}