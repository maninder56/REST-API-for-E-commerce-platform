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

const orderSchema = require('../schemas/orders.json').definitions.orders;

const orderdetailSchema = require('../schemas/ordersdetails.json').definitions.orderdetails;

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


exports.validateOrder = async (ctx, next) => {
    
    const validationOptions = {
        throwError: true,
        allowUnknownAttributes: false
    };
    
    const body = ctx.request.body;
    
    try {
        v.validate(body, orderSchema, validationOptions);
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



exports.validateOrderDetail = async (ctx, next) => {
    
    const validationOptions = {
        throwError: true,
        allowUnknownAttributes: false
    };
    
    const body = ctx.request.body;
    
    try {
        v.validate(body, orderdetailSchema, validationOptions);
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