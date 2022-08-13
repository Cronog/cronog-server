import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { connectFirebaseAuth } from "../connections/firebase";
import { Response } from "../types/response";
import formatMessageError from "./error";
import fetch from "cross-fetch";

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

export const renewAccessToken = async (refreshToken: string) : Promise<Response> => {
    try {
        var body = {
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken
        };
        
        var encodedBody = [];
        for (var property in body) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(body[property]);
          encodedBody.push(encodedKey + "=" + encodedValue);
        }

        const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body: encodedBody.join("&")
        })

        return {
            success: true,
            status: 200,
            data: await response.json()
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