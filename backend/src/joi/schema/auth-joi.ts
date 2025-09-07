import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).meta({ className: 'LoginRequest' });

export const loginGoogleSchema = Joi.object({
    credential: Joi.string().required()
}).meta({ className: 'LoginGoogleRequest' }); 