import { RequestHandler } from "express";
import UserModel from '../models/UserSchema';

export const getUsers: RequestHandler = async(request, response, next) =>{
	try {
		const users = await UserModel.find().exec();
		response.status(200).json(users);

	} catch (error) {
		next(error);
	}
};

export const getUser: RequestHandler = async(request, response, next) =>{
    const userId = request.params.userId;

	try {
		const user = await UserModel.findById(userId).exec();
		response.status(200).json(user);

	} catch (error) {
		next(error);
	}
};

export const creatUser: RequestHandler = async(request, response, next) =>{
    const name = request.body.name;
    console.log("request body:" + JSON.stringify(request.body));
    if (!name) {
        return response.status(400).json({ error: 'Name is required in the request body.' });
      }
    try {
        const newUser = await UserModel.create({ 
            name: name,
        });
        
        response.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};