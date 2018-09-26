import { createError } from "apollo-errors";

const WrongPasswordError = createError("WrongPasswordError", {
    message: "Login ou senha incorreto"
});

const EmailExist = createError("EmailExist", {
    message: "Já existe uma conta para este email"
});

const CantCreate = createError('CantCreate',{
    message: 'Houve algum erro criar a interação'
});

const WrongCredentials = createError('WrongCredentials', {
    message: 'Credenciais incorretas'
});

const InvalidToken = createError('InvalidToken', {
    message: 'Código Inválido'
});

const EmailNotExist = createError("EmailNotExist", {
    message: "Email não existe"
});

export 
{ 
    WrongPasswordError ,
    WrongCredentials,
    EmailExist,
    CantCreate,
    InvalidToken,
    EmailNotExist
}