import { createError } from "apollo-errors";

const WrongPasswordError = createError("WrongPasswordError", {
    message: "Login ou senha incorreto"
});

const EmailExist = createError("EmailExist", {
    message: "Já existe uma conta para este email"
});

const CantCreate = createError('CantCreate',{
    message: 'Houve algum erro criar a interação'
})

export 
{ 
    WrongPasswordError ,
    EmailExist,
    CantCreate
}