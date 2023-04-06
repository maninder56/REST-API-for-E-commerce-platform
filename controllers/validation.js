/**
* A module to run JSON Schema based validation on request/response data.
* @module controllers/validation
* @author Maninder Singh
* @see schemas/* for JSON Schema definition files
*/


const {Validator, ValidationError} = require('jsonschema');

const schema = require('../schemas/products.json').definitions.product;

const userSchema = require('../schemas/user.json').definitions.user;

const categorySchema = require('../schemas/category.json').definitions.category;

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

exports.validateCategory = async (ctx, next) => {
    
    const validationOptions = {
        throwError: true,
        allowUnknownAttributes: false
    };
    
    const body = ctx.request.body;
    
    try {
        v.validate(body, categorySchema, validationOptions);
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