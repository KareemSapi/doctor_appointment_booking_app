/**
 * @title
 * Role Controller: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Sept 29 2022, Kareem Sapi
 */

 const logger = require('../../../utils/logger');
 const Role = require('../../models/Roles');
 const User = require('../../models/Users');
 const config = require('config');
 const { validationResult } = require('express-validator');

 /**
  * @method: Create user role
  */
 exports.create_role = async (req, res) => {
    const { name, description } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){ return res.status(400).jsonp(errors.array()); }

    try {
        const USER = await User.findOne({where: {id: req.user.id}})

        if(USER.dataValues.RoleId != 1){ return res.sendStatus(403) }

        await Role.create({name: name, description: description});

        return res.status(201).json({message: `role succesfully created`})

    } catch (error) {
        logger.error(error)
        return res.status(400).json({message: `Something went wrong!!!`});
    }
 }

 /**
  * @method: get all roles
  */
 exports.get_all_roles = async (req, res) => {

    const id = req.params.id;

    try {
	    const USER = await User.findOne({where: {id: id}})

        if(USER.dataValues.RoleId != 1){ return res.sendStatus(403) }
	
	    return await Role.findAll();

    } catch (error) {

        logger.info(error)
        return res.status(400).json({message: `Something went wrong`})	
    }
 }