import { RequestHandler, response } from "express";
import UserModel from '../models/UserSchema';

// returns all users
export const getUsers: RequestHandler = async(request, response, next) =>{
	try {
		const users = await UserModel.aggregate([
            {
                $addFields:{
                    matchesWon:{
                        $size:{
                            $filter:{
                                input: '$matches',
                                as: 'match',
                                cond: {$eq: ['$$match.won', true]},
                            },
                        },
                    },
                    totalMatches: {$size: '$matches'},
                },  
            },
            {
                $match: {
                    matches: {
                        $elemMatch: { won: true }
                    }
                }
            },
            {
                $addFields:{
                    avgTurns: {$avg: '$matches.turns'},
                },  
            },
            {
                $project:{
                    name:1,
                    matches:1,
                    matchesWon:1,
                    totalMatches:1,
                    avgTurns:1,
                },
            },
        ])
        .exec();

        if (users){
            response.status(200).json(users);
        }else{
            console.log('no user within the last hour');
        }
		

	} catch (error) {
		next(error);
	}
};

// returns a user based on id
export const getUser: RequestHandler = async(request, response, next) =>{
    const userId = request.params.userId;

	try {
		const user = await UserModel.findById(userId).exec();
		response.status(200).json(user);

	} catch (error) {
		next(error);
	}
};

export const getUserByName: RequestHandler = async(request, response, next) =>{
    const userName = request.body.name;
	try {
        const userName = request.query.name;
		const user = await UserModel.findOne({ 
            name: userName 
        })
        .exec();
        if(user){
            console.log(user);
            response.status(200).json(user);
        }
        else{
            return response.status(404).json({ error: 'User not found in the database' });
        }
		

	} catch (error) {
		next(error);
	}
};

// returns all user with matches within the last hour
export const getLastHour: RequestHandler = async(request, response, next) =>{
    try {
        var oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        const users = await UserModel.aggregate([
            {
                $match:{
                    matches: {
                        $elemMatch: { timePlayed: { $gte: oneHourAgo } },
                    },
                },
            },
            {
                $addFields:{
                    matchesWon:{
                        $size:{
                            $filter:{
                                input: '$matches',
                                as: 'match',
                                cond: { 
                                    $and:[
                                        {$gte: ['$$match.timePlayed', oneHourAgo] },
                                        {$eq: ['$$match.won', true]},
                                    ]
                                },
                            },
                        },
                    },
                    totalMatches: {
                        $size: {
                            $filter: {
                                input: '$matches',
                                as: 'match',
                                cond: { $gte: ['$$match.timePlayed', oneHourAgo] },
                            },
                        },
                    },
                },  
            },
            {
                $match: {
                    matches: {
                        $elemMatch: { won: true }
                    }
                }
            },
            {
                $addFields:{
                    avgTurns: {$avg: '$matches.turns'},
                },  
            },
            {
                $project:{
                    name:1,
                    matchesWon:1,
                    totalMatches:1,
                    avgTurns:1,
                },
            },
        ])
        .exec();

        if (users) {
            response.status(200).json(users);
        } else {
            console.log('no user within the last hour');
        }
		
	} catch (error) {
		next(error);
	}
};



// creates a new user based on request body's name
export const creatUser: RequestHandler = async(request, response, next) =>{
    const name = request.body.name;
    // console.log("request body:" + JSON.stringify(request.body));
    if (!name) {
        return response.status(400).json({ error: 'Name is required in the request body.' });
      }
    try {
        const newUser = await UserModel.create({ 
            name: name,
        });
        
        request.session.userId = newUser._id;

        response.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

//adds a match to a used based on userId, include match info in the request body and userId in params
export const updateUser: RequestHandler = async(request, response, next) =>{
    const {won, turns, timePlayed} = request.body;
    const userId = request.params.userId;
    const newMatch ={
        won,
        turns, 
        timePlayed,
    }
    
    try {
		const users = await UserModel.updateOne(
            {
                _id: userId,
            },
            {
                $push: {matches: newMatch}
            },

        ).exec();

        if (users) {
            response.status(200).json(users);
        } else {
            console.log('no user within the last hour');
        }
		
	} catch (error) {
		next(error);
	}

};