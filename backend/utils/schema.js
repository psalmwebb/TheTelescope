const Joi = require('joi');

module.exports = class schema{
    static get loginSchema(){
        return Joi.object({ 
            username: Joi.string().min(3).required(),
            password: Joi.string().min(5).required(),
        });
    }

    static get registerSchema(){
        return Joi.object({ 
            username: Joi.string().min(3).required(),
            password: Joi.string().min(5).required(),
        });
    }

    static get resetPassword(){
        return Joi.object({ 
            username: Joi.string().min(3).required(),
            newPassword: Joi.string().min(5).required(),
        });
    }
}

