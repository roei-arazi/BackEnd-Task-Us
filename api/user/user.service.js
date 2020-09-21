
const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId

async function query(userId) {
    try {
        console.log('searching for user:', userId);
        const collection = await dbService.getCollection('user')
        if (userId) return await collection.findOne({ "_id": ObjectId(userId) })
        else return await collection.find().toArray()
    } catch (err) {
        console.log('Error, cannot find user/s', err)
        throw err
    }
}

async function add(user) {
    user.createdAt = Date.now();
    try {
        const collection = await dbService.getCollection('user')
        await collection.insertOne(user)
        return user
    } catch (err) {
        console.log('Error, cannot create user', err)
        throw err
    }

}
async function update(user) {
    user.updatedAt = Date.now();
    try {
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ "_id": ObjectId(user._id) }, { $set: { ...user, _id: ObjectId(user._id) } })
        return user
    } catch (err) {
        console.log('Error, cannot update user', err)
        throw err
    }

}

async function getByUsername(username){
    try{
        const collection = dbService.getCollection('user')
        const user = await collection.findOne({"username": username})
        return user;
    } catch (err) {
        console.log('Error, cannot find user', err)
        throw err
    }
}


module.exports = {
    add,
    query,
    update,
    getByUsername
}
