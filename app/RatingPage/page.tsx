import Buttons from "./buttons";
import axios from "axios";

async function RenderSelection(props: any){
    var selection = props.selection;

    if(selection == undefined){
        return(
            <div className="flex justify-center">
                <img src="https://derpicdn.net/img/2018/3/16/1682458/full.png"/>
            </div>
        )
    }

    const data = await axios.get("http://localhost:3000/RatingPage/api", {
        params: { selection: selection}
      });
    

    var ratings = data.data.documents;
    var category = data.data.category;
    console.log(ratings);

    if(ratings[0] == undefined){
        return(
            <div className="text-center mt-2">
                <p>No Results</p>
                <div className="flex justify-center mt-12">
                    <img src="https://comicvine.gamespot.com/a/uploads/scale_medium/5/55582/2725776-512697_derpy__by_sierraex_.png"/>
                </div>
            </div>
        )
    }

    return(
        <div className="flex justify-center mt-12">
            <div className="text-left text-lg">
                <p className="mt-2 text-xl font-bold">Allen</p>
                <Buttons selection={ratings[0].Allen == undefined ? "N/A" : ratings[0].Allen} name="Allen" evaluation={selection} category={category}/>

                <p className="mt-6 text-xl font-bold">Cindy</p>
                <Buttons selection={ratings[0].Cindy == undefined ? "N/A" : ratings[0].Cindy} name="Cindy" evaluation={selection} category={category}/>

                <p className="mt-6 text-xl font-bold">Andy</p>
                <Buttons selection={ratings[0].Andy == undefined ? "N/A" : ratings[0].Andy} name="Andy" evaluation={selection} category={category}/>

                <p className="mt-6 text-xl font-bold">Isaac</p>
                <Buttons selection={ratings[0].Isaac == undefined ? "N/A" : ratings[0].Isaac} name="Isaac" evaluation={selection} category={category}/>

                <p className="mt-6 text-xl font-bold">Actual Rating: {ratings[0].Rating == undefined ? "N/A" : ratings[0].Rating}</p>
            </div>
        </div>
    )
}


export default async function RatingPage(props: any){
    
    console.log(props);
    
    var selection = props.searchParams.Input;

    return(
        <div className="bg-white py-24">
            <div className="">
                <div className="text-4xl font-bold text-center">
                    <h1>Rating Pages</h1>
                </div>
                <form className="flex justify-center mt-6 gap-x-4">
                    <input type="text" name="Input" className="w-1/2 border border-purple-500 rounded-md py-2 px-4 border-2 focus:outline-none focus:ring focus:border-purple-500" />
                    <input type="submit" value="Search" className="bg-purple-500 text-white font-bold py-2 px-4 rounded-lg" />
                </form>
            </div>
            <div>
                <div className="mt-12 font-bold text-2xl text-center">
                    <h2>{selection}</h2>
                </div>
                <RenderSelection selection={selection}/>
            </div>
        </div>
    )
}
