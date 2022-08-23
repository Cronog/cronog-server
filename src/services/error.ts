export const formatMessageError = (code : string) : string => {
    switch(code){
        case "auth/invalid-email":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "Email e/ou senha inválidos";
        case "auth/weak-password":
            return "Sua senha deve possuir pelo menos 6 caracteres";
        case "auth/email-already-in-use":
            return "Email inválido";
        default:
            return "Erro inesperado";
    }
}

export default formatMessageError;