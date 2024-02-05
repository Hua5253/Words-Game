import { RequestHandler } from "express";
import UserModel from '../models/UserSchema';

export const getUser: RequestHandler = async(request, response, next) =>{
	try {
		const user = await UserModel.find().exec();
		response.status(200).json(user);

	} catch (error) {
		next(error);
	}
};