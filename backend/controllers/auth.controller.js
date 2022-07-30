const dotenv = require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
// const sql = require('mssql');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const moment = require('moment'); // require
const randomstring = require("randomstring");
const userM = require('../models/m.Users');


module.exports = class authentication{
    
    // @desc login for users
    static async login(req, res){ 
        return res.status(200).json({
            message: 'Welcome to Telescope'
        })
    }

    // @desc register for users
    static async register(req, res){ 
        const user = await userM.findOne({where : {username: req.body.username}});
        if(user)
            return res.json({
                status: 'error',
                message: 'user already exist'
            });
        const hashedPass = await bcrypt.hash(req.body.password, 8);
        const uuid = randomstring.generate(24);
        // const created = + new Date();

        const newUser = {
            uuid: uuid,
            username: req.body.username,
            password: hashedPass,
        } 
        await userM.create(newUser); 
        return res.status(200).json({
            status: 'success',
            message: 'user created successfully'
        });     
    }
}