// create an express app
const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://it-kmitl-book-service:iPnrOUZxy5Z9TsPQ@book-service-east.zgdyk.mongodb.net/plt-book-service?retryWrites=true&w=majority";
//process.env.MONGODB_URI
//mongodb+srv://it-kmitl-book-service:iPnrOUZxy5Z9TsPQ@book-service-east.zgdyk.mongodb.net/plt-book-service?retryWrites=true&w=majority

// use the express-static middleware
app.use(express.static("public"));

// define the first route
app.get("/book", async function (req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    let dataResult = [];
  
    try {
        await client.connect();

        const database = client.db('plt-book-service');
        const collection = database.collection('book');

        const cursor = await collection.find();

        await cursor.forEach(function(doc, err) {
            dataResult.push(doc);
        })

        return res.json(dataResult);
    } catch(err) {
        console.log(err);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

app.get("/userinfo/:id", async function (req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    const userId = req.params.id;
  
    try {
        await client.connect();

        const database = client.db('plt-book-service');
        const collection = database.collection('user');

        const query = { id: userId };
        const cursor = await collection.aggregate([
            { $match: query },
            { $sample: { size: 1 } },
            { $project: 
                {
                    name: 1,
                    lastname: 1,
                    user_address: 1,
                    email: 1,
                }
            }
        ]);

        const dataSend = await cursor.next();

        return res.json(dataSend);
    } catch(err) {
        console.log(err);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

app.get("/userpoint/:id", async function (req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    const userId = req.params.id;
  
    try {
        await client.connect();

        const database = client.db('plt-book-service');
        const collection = database.collection('user');

        const query = { id: userId };
        const cursor = await collection.aggregate([
            { $match: query },
            { $sample: { size: 1 } },
            { $project: 
                {
                    user_point: 1,
                }
            }
        ]);

        const dataSend = await cursor.next();

        return res.json(dataSend);
    } catch(err) {
        console.log(err);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

app.get("/reward", async function (req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    let dataResult = [];
  
    try {
        await client.connect();

        const database = client.db('plt-book-service');
        const collection = database.collection('reward');

        const cursor = await collection.find();

        await cursor.forEach(function(doc, err) {
            dataResult.push(doc);
        })

        return res.json(dataResult);
    } catch(err) {
        console.log(err);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

app.post("/addpoint", jsonParser, async function (req, res) {

    const { id, point } = req.body;

    if (!id || !point) {
        return res.status(400).json({msg: "no data received"});
    }

    const client = new MongoClient(uri, { useUnifiedTopology: true });
  
    try {
        await client.connect();

        const database = client.db('plt-book-service');
        const collection = database.collection('user');

        await collection.updateOne(
            { id: id },
            { $inc: { user_point: parseInt(point) } }
        );

        return res.status(200).json({msg: "points added"});
    } catch(err) {
        console.log(err);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

app.post("/removepoint", jsonParser, async function (req, res) {

    const { id, point, reward_id } = req.body;

    if (!id || !point) {
        return res.status(400).json({msg: "no data received"});
    }

    const client = new MongoClient(uri, { useUnifiedTopology: true });
  
    try {
        await client.connect();

        const database = client.db('plt-book-service');
        const collection = database.collection('user');
        const collectionReward = database.collection('reward');

        await collection.updateOne(
            { id: id },
            { $inc: { user_point: (-parseInt(point)) } }
        );

        await collectionReward.updateOne(
            { id: reward_id },
            { $inc: { in_stock: -1 } }
        );

        return res.status(200).json({msg: "points removed"});
    } catch(err) {
        console.log(err);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

app.post("/rewardhistory", jsonParser, async function (req, res) {

    const { redeem_id, user_id, reward_id, time_exchange } = req.body;

    if (!redeem_id || !reward_id || !time_exchange || !user_id) {
        return res.status(400).json({msg: "no data received"});
    }

    const client = new MongoClient(uri, { useUnifiedTopology: true });
  
    try {
        await client.connect();

        const database = client.db('plt-book-service');
        const collection = database.collection('reward_history');

        await collection.insertOne(
            {
                redeem_id: "",
                user_id: user_id,
                reward_id: reward_id,
                time_exchange: time_exchange,
            }
        );

        return res.status(200).json({msg: "data inserted"});
    } catch(err) {
        console.log(err);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

app.get("/rewardhistory", async function (req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    let dataResult = [];
  
    try {
        await client.connect();

        const database = client.db('plt-book-service');
        const collection = database.collection('reward_history');

        const cursor = await collection.find();

        await cursor.forEach(function(doc, err) {
            dataResult.push(doc);
        })

        return res.json(dataResult);
    } catch(err) {
        console.log(err);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

app.get("/reward/:id", async function (req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    const rewardId = req.params.id;
  
    try {
        await client.connect();

        const database = client.db('plt-book-service');
        const collection = database.collection('reward');

        const query = { id: rewardId };
        const cursor = await collection.aggregate([
            { $match: query },
            { $sample: { size: 1 } },
            { $project: 
                {
                    id: 1,
                    name: 1,
                    price: 1,
                    cover_img: 1,
                    in_stock: 1,
                }
            }
        ]);

        const dataSend = await cursor.next();

        return res.json(dataSend);
    } catch(err) {
        console.log(err);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
