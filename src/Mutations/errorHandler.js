import { createError } from "apollo-errors";

const WrongPasswordError = createError("WrongPasswordError", {
    message: "Senha incorreta"
});

export { WrongPasswordError }