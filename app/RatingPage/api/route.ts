import { MongoClient, ServerApiVersion } from "mongodb"
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest){
    var uri = process.env.DATABASE_URL;
    if(uri == undefined){
        uri = "";
    }
    const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    const url = new URL(request.url);
    var selection = url.searchParams.get("selection");
    console.log(selection);

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("Ratings").command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");

        const database = client.db("Ratings");

        var category = "";

        var collection = database.collection("Episodes");
        var documents = await collection.find({'Name': selection}).toArray();
        if(documents.length != 0){
            category = "Episodes";
            return NextResponse.json({ documents, category });
        }
        collection = database.collection("Characters");
        var documents = await collection.find({'Name': selection}).toArray();
        if(documents.length != 0){
            category = "Characters";
            return NextResponse.json({ documents, category });
        }
        collection = database.collection("Songs");
        var documents = await collection.find({'Name': selection}).toArray();
        if(documents.length != 0){
            category = "Songs";
            return NextResponse.json({ documents, category });
        }
        collection = database.collection("Shorts");
        var documents = await collection.find({'Name': selection}).toArray();
        if(documents.length != 0){
            category = "Shorts";
            return NextResponse.json({ documents, category });
        }
        
        return NextResponse.json({ documents, category });

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}