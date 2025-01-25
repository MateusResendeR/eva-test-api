import joi from "joi";

export const loginUserAdmValidator = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});