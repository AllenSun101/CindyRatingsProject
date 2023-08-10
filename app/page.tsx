import { MongoClient, ServerApiVersion } from "mongodb"
import Link from "next/link";

async function DataFetch(){
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
    
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("Ratings").command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");

        var documents : any = [];

        const database = client.db("Ratings");

        var collection = database.collection("Episodes");
        const episodes = await collection.find({}).toArray();
        documents[0] = episodes;

        collection = database.collection("Characters");
        const characters = await collection.find({}).toArray();
        documents[1] = characters;

        collection = database.collection("Songs");
        const songs = await collection.find({}).toArray();
        documents[2] = songs;

        collection = database.collection("Shorts");
        const shorts = await collection.find({}).toArray();
        documents[3] = shorts;

        return documents;

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

interface Calculations {
    [key: string]: number;
}

interface Average {
    [key: string]: number | string;
}

export default async function Home(){

    const results = await DataFetch();
    var average_ratings: Average = {Allen: 0, Isaac: 0, Andy: 0, Cindy: 0, Collective: 0, Rating: 0};
    var names = ['Allen', 'Isaac', 'Andy', 'Cindy', 'Collective', 'Rating'];
    
    function CalculateStats(){
        
        const sums : Calculations = {Allen: 0, Isaac: 0, Andy: 0, Cindy: 0, Collective: 0, Rating: 0};
        const counts : Calculations = {Allen: 0, Isaac: 0, Andy: 0, Cindy: 0, Collective: 0, Rating: 0};

        results[0].map((episode: any, index: any) => {
            names.forEach((name) => {
                if(episode[name] && episode[name] != "N/A"){
                    sums[name] += parseFloat(episode[name]);
                    counts[name]++;
                }
            })
        })

        names.forEach((name) => {
            if(counts[name] == 0){
                average_ratings[name] = 'N/A';
            }
            else{
                average_ratings[name] = Number((sums[name] / counts[name]).toFixed(1));
            }
        })
    }

    CalculateStats();

    return(
        <div className="bg-white py-24">
            <div className="mx-auto">
                <div className="text-4xl font-bold text-center">
                    <h1>My Little Rater</h1>
                </div>
                <div className="flex justify-center mt-12">
                <table className="text-center table-auto">
                    <tbody className="">
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Episode</th>
                        <th className="px-4 py-2">Cindy</th>
                        <th className="px-4 py-2">Andy</th>
                        <th className="px-4 py-2">Isaac</th>
                        <th className="px-4 py-2">Allen</th>
                        <th className="px-4 py-2">Rating</th>
                        <th className="px-4 py-2">Family Rating</th>
                    </tr>
                    {results[0].map((episode: any, index: any) => {
                        return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-purple-100' : 'bg-green-100'}>
                            <td className="px-4 py-2"><Link href={{pathname: '/RatingPage', query: { Input: episode.Name }}}>
                                {episode.Name == undefined ? "N/A" : episode.Name}</Link></td>
                            <td className="px-4 py-2">{episode.Cindy == undefined ? "N/A" : episode.Cindy}</td>
                            <td className="px-4 py-2">{episode.Andy == undefined ? "N/A" : episode.Andy}</td>
                            <td className="px-4 py-2">{episode.Isaac == undefined ? "N/A" : episode.Isaac}</td>
                            <td className="px-4 py-2">{episode.Allen == undefined ? "N/A" : episode.Allen}</td>
                            <td className="px-4 py-2">{episode.Rating == undefined ? "N/A" : episode.Rating}</td>
                            <td className="px-4 py-2">{episode.Collective == undefined ? "N/A" : episode.Collective}</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>

                <div className="flex justify-center mt-12">
                <table className="text-center table-auto">
                    <tbody className="">
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Character</th>
                        <th className="px-4 py-2">Cindy</th>
                        <th className="px-4 py-2">Andy</th>
                        <th className="px-4 py-2">Isaac</th>
                        <th className="px-4 py-2">Allen</th>
                        <th className="px-4 py-2">Rating</th>
                        <th className="px-4 py-2">Family Rating</th>
                    </tr>
                    {results[1].map((character: any, index: any) => {
                        return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-purple-100' : 'bg-green-100'}>
                            <td className="px-4 py-2"><Link href={{pathname: '/RatingPage', query: { Input: character.Name }}}>
                                {character.Name == undefined ? "N/A" : character.Name}</Link></td>
                            <td className="px-4 py-2">{character.Cindy == undefined ? "N/A" : character.Cindy}</td>
                            <td className="px-4 py-2">{character.Andy == undefined ? "N/A" : character.Andy}</td>
                            <td className="px-4 py-2">{character.Isaac == undefined ? "N/A" : character.Isaac}</td>
                            <td className="px-4 py-2">{character.Allen == undefined ? "N/A" : character.Allen}</td>
                            <td className="px-4 py-2">{character.Rating == undefined ? "N/A" : character.Rating}</td>
                            <td className="px-4 py-2">{character.Collective == undefined ? "N/A" : character.Collective}</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>

                <div className="flex justify-center mt-12">
                <table className="text-center table-auto">
                    <tbody className="">
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Song</th>
                        <th className="px-4 py-2">Cindy</th>
                        <th className="px-4 py-2">Andy</th>
                        <th className="px-4 py-2">Isaac</th>
                        <th className="px-4 py-2">Allen</th>
                        <th className="px-4 py-2">Rating</th>
                        <th className="px-4 py-2">Family Rating</th>
                    </tr>
                    {results[2].map((song: any, index: any) => {
                        return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-purple-100' : 'bg-green-100'}>
                            <td className="px-4 py-2"><Link href={{pathname: '/RatingPage', query: { Input: song.Name }}}>
                                {song.Name == undefined ? "N/A" : song.Name}</Link></td>
                            <td className="px-4 py-2">{song.Cindy == undefined ? "N/A" : song.Cindy}</td>
                            <td className="px-4 py-2">{song.Andy == undefined ? "N/A" : song.Andy}</td>
                            <td className="px-4 py-2">{song.Isaac == undefined ? "N/A" : song.Isaac}</td>
                            <td className="px-4 py-2">{song.Allen == undefined ? "N/A" : song.Allen}</td>
                            <td className="px-4 py-2">{song.Rating == undefined ? "N/A" : song.Rating}</td>
                            <td className="px-4 py-2">{song.Collective == undefined ? "N/A" : song.Collective}</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>

                <div className="flex justify-center mt-12">
                <table className="text-center table-auto">
                    <tbody className="">
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Short</th>
                        <th className="px-4 py-2">Cindy</th>
                        <th className="px-4 py-2">Andy</th>
                        <th className="px-4 py-2">Isaac</th>
                        <th className="px-4 py-2">Allen</th>
                        <th className="px-4 py-2">Rating</th>
                        <th className="px-4 py-2">Family Rating</th>
                    </tr>
                    {results[3].map((short: any, index: any) => {
                        return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-purple-100' : 'bg-green-100'}>
                            <td className="px-4 py-2"><Link href={{pathname: '/RatingPage', query: { Input: short.Name }}}>
                                {short.Name == undefined ? "N/A" : short.Name}</Link></td>
                            <td className="px-4 py-2">{short.Cindy == undefined ? "N/A" : short.Cindy}</td>
                            <td className="px-4 py-2">{short.Andy == undefined ? "N/A" : short.Andy}</td>
                            <td className="px-4 py-2">{short.Isaac == undefined ? "N/A" : short.Isaac}</td>
                            <td className="px-4 py-2">{short.Allen == undefined ? "N/A" : short.Allen}</td>
                            <td className="px-4 py-2">{short.Rating == undefined ? "N/A" : short.Rating}</td>
                            <td className="px-4 py-2">{short.Collective == undefined ? "N/A" : short.Collective}</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>

                <div className="mt-24 px-24">
                    <div className="text-4xl font-bold text-center">
                        <h1>Statistics</h1>
                    </div>
                    <div className="text-lg mt-6 flex justify-center">
                        <div className="text-left">
                            <p className="mt-2">Allen Average Rating: {average_ratings.Allen}</p>
                            <p className="mt-2">Isaac Average Rating: {average_ratings.Isaac}</p>
                            <p className="mt-2">Andy Average Rating: {average_ratings.Andy}</p>
                            <p className="mt-2">Cindy Average Rating: {average_ratings.Cindy}</p>
                            <p className="mt-2">Family Average Rating: {average_ratings.Collective}</p>
                            <p className="mt-2">Actual Average Rating: {average_ratings.Rating}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}