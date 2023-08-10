import { MongoClient, ServerApiVersion } from "mongodb"
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
    var selection = body.selection;
    var field = body.field;
    var rating = body.rating;
    var category = body.category;
    console.log(selection + " " + field + " " + rating + " " + category);

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("Ratings").command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");

        const database = client.db("Ratings");
        const collection = database.collection(category);

        const operation = await collection.updateOne({Name : selection}, {$set:{[field] : rating}});

        // Update Collectives
        const document = await collection.findOne({Name: selection});
        var names = ["Allen", "Isaac", "Andy", "Cindy"];
        var sumRatings = 0;
        var numRatings = 0;

        if(document){
            names.forEach((name) => {
                if(document[name] && document[name] != "N/A"){
                    sumRatings += parseFloat(document[name]);
                    numRatings++;
                }
            })
            
            if(numRatings == 0){
                const updateCollective = await collection.updateOne({Name: selection}, {$set:{Collective: 'N/A'}});
            }
            else{
                var average = Number((sumRatings / numRatings).toFixed(1));
                const updateCollective = await collection.updateOne({Name: selection}, {$set:{Collective: average}});
            } 
        }

        console.log("Success");
     
        return NextResponse.json({ "message" : "Success!" });

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}