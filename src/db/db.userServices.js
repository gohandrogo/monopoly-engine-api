const connect = require('./db.connection');
const { User } = require('../game-utils/buisnessObjects/index');
//get user by name
async function getUserByName(name){
    try {
        const db = await connect();
        return await db.collection('users').findOne({name});

    } catch (error) {
        throw error;
    }
}

async function getAllUsers(){
    try{
        const db = await connect();
        return await db.collection('users').find({}).toArray();
    } catch (error) {
        throw error;
    }
}

async function updateUserPosition({name, _id,position}){
    try {
        const db = await connect();
        const resp = await db.collection('users').updateOne({name, _id}, {$set: {position}});
        return await db.collection('users').findOne({name,_id});
        
    } catch (error) {
        throw error;
    }
}

async function createNewUser(name){
    const newUser = new User(name);
    try{
        const db = await connect();
        
        const {ops: record} = await db.collection('users').insertOne(newUser);
        const insertedRecord = await db.collection('users').findOne(record[0]);
        console.log("inserted record: ", insertedRecord._id);
        return insertedRecord;
    } catch (error) {
        throw error;
    }
   
}

//update user position

module.exports = {
    getUserByName, 
    createNewUser,
    updateUserPosition,
    getAllUsers
}