const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://TAgnesT:1234@cluster0vizsga.gfu4hp2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const popolo = require('./mongohandlerfile1');


async function addUser(user){
    console.log(user);
    try {
        await client.connect(); 
        const collection = client.db("test").collection("devices");
        console.log("Success conncection");
        let result = await collection.insertOne(user);
    } catch (e){
        console.log(e);
    } finally {
        await client.close();
    }
};
addUser(popolo.list[0]);


async function read(query = {}){
    //console.log(user);
    try {
        await client.connect();
        const collection = client.db("test").collection("devices");
        console.log("Success conncection");
        let result = await collection.find(query).toArray();
        console.log(result.length);
        console.log(result);
    } catch (e){
        console.log(e);
    } finally { 
        await client.close();
    }
};
read({gender: 'male'});
//read({name: 'Kedves Pisti'});
//read({email: 'kpisti@hotmail.com'});


async function updateUser(query = {}, newvalues){
    try {
        await client.connect(); 
        const collection = client.db("test").collection("devices");
        console.log("Success conncection");
        let result = await collection.updateMany(query, newvalues);
        console.log('${result.modifiedCount} has been updated');
    } catch (e){
        console.log(e);
    } finally {
        await client.close();
    }
};
updateUser({ $and: [{name: 'Pisti'}, {gender: 'male'}]}, {$set: {name: 'Nemkedves', gender: 'female'}});



async function removeUser(query = {}){
    try {
        await client.connect(); 
        const collection = client.db("test").collection("devices");
        console.log("Success conncection");
        let result = await collection.deleteMany(query);
        console.log('${result.insertedId} has been deleted');
    } catch (e){
        console.log(e);
    } finally {
        await client.close();
    }
};

removeUser(popolo.list[0]);