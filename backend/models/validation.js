// models/validation.js
const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "L'email n'est pas valide",
    "any.required": "L'email est requis",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    "any.required": "Le mot de passe est requis",
  }),
});

module.exports = { userSchema };
