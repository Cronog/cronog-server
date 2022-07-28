export const formatMessageError = (code : string) : string => {
    switch(code){
        case "auth/invalid-email":
            return "Email inválido";
        case "auth/wrong-password":
            return "Senha incorreta"
        case "auth/user-not-found":
            return "Email não encontrado"
        case "auth/weak-password":
            return "Senha muito fraca"
        default:
            return "Erro inesperado";
    }
}

export default formatMessageError;