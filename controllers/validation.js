const {Validator, ValidationError} = require('jsonschema');

const schema = require('../schemas/products.json');

const userSchema = require('../schemas/user.json').definitions.user;


const v = new Validator();

exports.validateProduct = async (ctx, next) => {
    
    const validationOptions = {
        throwError: true,
        allowUnknownAttributes: false
    };
    
    const body = ctx.request.body;
    
    try {
        v.validate(body, schema, validationOptions);
        await next();
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.body = error;
            ctx.status = 400;
        } else {
            throw error;
        }
    }
}

exports.validateUser = async (ctx, next) => {
    
    const validationOptions = {
        throwError: true,
        allowUnknownAttributes: false
    };
    
    const body = ctx.request.body;
    
    try {
        v.validate(body, userSchema, validationOptions);
        await next();
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.body = error;
            ctx.status = 400;
        } else {
            throw error;
        }
    }
}