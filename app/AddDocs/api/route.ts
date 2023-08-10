import { MongoClient, MongoRuntimeError, ServerApiVersion } from "mongodb"
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest){
    const uri: string = "mongodb+srv://allensun21527:CUsASbfPWd6A2ZNz@ratingsdata.6eymg7t.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    const body = await request.json();
    console.log(body);
    var name = body.Name;
    var category = body.Category;
    var rating = body.Rating;
    console.log(name + " " + category + " " + rating);

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("Ratings").command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");

        const database = client.db("Ratings");

        const collectionList = await database.listCollections().toArray();
        const collectionExists = collectionList.some(
            (collection) => collection.name === category
          );

        if(!collectionExists){
            console.log("Invalid Category Name");
            return NextResponse.json({ "message" : "Invalid Category!" });
        }
        
        if(rating != "N/A"){
            var parsedRating = parseFloat(rating);
            if(isNaN(parsedRating) || parsedRating < 0.0 || parsedRating > 10.0){
                console.log("Invalid Rating");
                return NextResponse.json({ "message" : "Invalid Rating!" });
            }
        }
        
        const collection = database.collection(category);

        const alreadyExists = await collection.findOne({Name: name});

        if(!alreadyExists){
            const operation = await collection.insertOne({Name: name, Rating: rating});
        }
        else{
            console.log("Already Exists");
            return NextResponse.json({ "message" : "Already Exists!" });
        }

        console.log("Success");
     
        return NextResponse.json({ "message" : "Success!" });

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}