//tetszoleges listaval proba
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://TAgnesT:1234@cluster0vizsga.gfu4hp2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const pizzak = require('./mongohandlerfile2');


async function addPizzas(pizza){
    console.log(pizza);
    try {
        await client.connect(); 
        const collection = client.db("test").collection("devices");
        console.log("Success conncection");
        let result = await collection.insertMany(pizza);
        //console.log(result.insertedIds);
    } catch (e){
        console.log(e);
    } finally {
        await client.close();
    }
};
addPizzas(pizzak.list);


async function read(query = {}, projection = {}){
    //console.log(user);
    try {
        await client.connect();
        const collection = client.db("test").collection("devices");
        console.log("Success conncection");
        let result = await collection.find(query, projection).toArray();
        console.log(result.length);
        console.log(result);
    } catch (e){
        console.log(e);
    } finally {
        await client.close();
    }
};
//read({type: 'vega'});
//read({$or: [{type: 'meat'},{top: 'white'}]});
//read({"calories.pasta": {$lt: 260, $gt: 150}});
//read({}, {projection: {_id: 0}});
read({}, {projection: {calories: 0}});



async function updatePizza(query = {}, newvalues){
    try {
        await client.connect(); 
        const collection = client.db("test").collection("devices");
        console.log("Success conncection");
        let result = await collection.updateMany(query, newvalues);
        console.log(`${result.modifiedCount} has been updated`);
    } catch (e){
        console.log(e);
    } finally {
        await client.close();
    }
};
updatePizza({ $and: [{pizzaname: 'Ortolana'}, {type: 'vega'}]}, {$set: {pizzaname: 'Zoldseges', type: 'vegetarianus'}});



async function removePizza(query = {}){
    try {
        await client.connect(); 
        const collection = client.db("test").collection("devices");
        console.log("Success conncection");
        let result = await collection.deleteOne(query);
        console.log(`${result.insertedId} has been deleted`);
    } catch (e){
        console.log(e);
    } finally {
        await client.close();
    }
};

removePizza({pizzaname: {$regex: '^Capri'}});
