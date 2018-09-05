import { createError } from "apollo-errors";

const WrongPasswordError = createError("WrongPasswordError", {
    message: "Login ou senha incorreto"
});

const EmailExist = createError("EmailExist", {
    message: "Já existe uma conta para este email"
});

export 
{ 
    WrongPasswordError ,
    EmailExist
}