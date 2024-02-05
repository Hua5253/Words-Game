import { RequestHandler, response } from "express";
import UserModel from '../models/UserSchema';

// returns all users
export const getUsers: RequestHandler = async(request, response, next) =>{
	try {
		const users = await UserModel.find().exec();
        if (users){
            response.status(200).json(users);
            console.log(users);
        }else{
            console.log('no user within the last hour');
        }
		

	} catch (error) {
		next(error);
	}
};

// // returns all users sorted by games won
// export const getUsersByWins: RequestHandler = async(request, response, next) =>{
// 	try {
// 		const users = await UserModel.find()
//         .sort(
//             { 'matches.$[elem].won': -1 }    
//         )
//         .exec();

//         if (users){
//             response.status(200).json(users);
//             console.log(users);
//         }else{
//             console.log('no user within the last hour');
//         }

// 	} catch (error) {
// 		next(error);
// 	}
// };

// returns all users sorted by games won, include wonMatches as a field in response
export const getUsersByWins: RequestHandler = async(request, response, next) =>{
	try {
		const users = await UserModel.aggregate([
            {
              $addFields:{
                wonmatches:{
                    $size:{
                        $filter:{
                            input: 'matches',
                            as: 'match',
                            cond: {$eq: ['$$match.won', true]},
                        },
                    },
                },  
              },  
            },
            {
                $sort: {
                    wonMatches: -1
                },
            },
            {
                $project:{
                    name:1,
                    matches:1,
                    wonMatches:1,
                },
            },
        ])
        .exec();

        if (users){
            response.status(200).json(users);
            console.log(users);
        }else{
            console.log('no user within the last hour');
        }

	} catch (error) {
		next(error);
	}
};

// // returns all users sorted by games played
// export const getUsersByGamesPlayed: RequestHandler = async(request, response, next) =>{
// 	try {
// 		const users = await UserModel.find()
//         .sort(
//             { 'matches.length': -1 }    
//         )
//         .exec();

//         if (users){
//             response.status(200).json(users);
//             console.log(users);
//         }else{
//             console.log('no user within the last hour');
//         }

// 	} catch (error) {
// 		next(error);
// 	}
// };


// returns all users sorted by games played, includes number of matches in response
export const getUsersByGamesPlayed: RequestHandler = async(request, response, next) =>{
	try {
		const users = await UserModel.aggregate([
            {
                $addFields:{
                    totalMatches: {$size: '$matches'},
                },
            },
            {
                $sort:{
                    totalMatches: -1
                },
            },
            {
                $project:{
                    name:1,
                    matches:1,
                    totalMatches:1,
                },
            },
        ])
        .exec();

        if (users){
            response.status(200).json(users);
            console.log(users);
        }else{
            console.log('no user within the last hour');
        }

	} catch (error) {
		next(error);
	}
};

// returns all users sorted by turns in won games, includes average turn value in response
export const getUsersByTurns: RequestHandler = async(request, response, next) =>{
	try {
		const users = await UserModel.aggregate([
            {
                $match:{
                    'matches.won': true
                },
            },
            {
                $addFields:{
                    avgTurns: {$avg: '$matches.turns'},
                },
            },
            {
                $sort:{
                    avgTurns: -1
                },
            },
            {
                $project:{
                    name:1,
                    matches:1,
                    avgTurns:1,
                },
            },
        ])
        .exec();

        if (users){
            response.status(200).json(users);
            console.log(users);
        }else{
            console.log('no user within the last hour');
        }

	} catch (error) {
		next(error);
	}
};

// returns all user with matches within the last hour
export const getLastHour: RequestHandler = async(request, response, next) =>{
    try {
        var oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
		const users = await UserModel.find({
            matches: {
                $elemMatch: { timePlayed: { $gte: oneHourAgo } },
              },
        }).exec();

        if (users) {
            response.status(200).json(users);
            console.log(users);
        } else {
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

// creates a new user based on request body's name
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
            console.log(users);
        } else {
            console.log('no user within the last hour');
        }
		
	} catch (error) {
		next(error);
	}

};