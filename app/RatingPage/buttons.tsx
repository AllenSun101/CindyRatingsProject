'use client'
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function Buttons(props: any){

    const[selected, setSelected] = useState(String(props.selection));
    const name = props.name;
    const evaluation = props.evaluation;
    const category = props.category;

    const mutation = useMutation({
        mutationFn: (params : object) => {
          return axios.post('http://localhost:3000/RatingPage/update_api', params);
        },
      })
      
      const buttonStyle = (isSelected: boolean) => ({
        width: "40px", // Set the width of the button (adjust as needed)
        height: "40px", // Set the height of the button (adjust as needed)
        border: "2px solid #6B46C1",
        backgroundColor: isSelected ? "#6B46C1" : "transparent",
        color: isSelected ? "white" : "#6B46C1",
        borderRadius: "50%", // Use 50% to make it a perfect circle
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        outline: "none",
      });

    // track buttons and send changes
    function ChangeRating(value: any){
        setSelected(value);
        mutation.mutate({ selection: evaluation, field: name, rating: value, category: category });
    }

    return(
        <div>
            <p>Rating: {selected}</p>
            <div style={{ display: "flex", gap: "8px" }}>
                <button style={buttonStyle(selected === "N/A")} onClick={() => ChangeRating("N/A")}>N</button>
                <button style={buttonStyle(selected === "1")} onClick={() => ChangeRating("1")}>1</button>
                <button style={buttonStyle(selected === "2")} onClick={() => ChangeRating("2")}>2</button>
                <button style={buttonStyle(selected === "3")} onClick={() => ChangeRating("3")}>3</button>
                <button style={buttonStyle(selected === "4")} onClick={() => ChangeRating("4")}>4</button>
                <button style={buttonStyle(selected === "5")} onClick={() => ChangeRating("5")}>5</button>
                <button style={buttonStyle(selected === "6")} onClick={() => ChangeRating("6")}>6</button>
                <button style={buttonStyle(selected === "7")} onClick={() => ChangeRating("7")}>7</button>
                <button style={buttonStyle(selected === "8")} onClick={() => ChangeRating("8")}>8</button>
                <button style={buttonStyle(selected === "9")} onClick={() => ChangeRating("9")}>9</button>
                <button style={buttonStyle(selected === "10")} onClick={() => ChangeRating("10")}>10</button>
            </div>
        </div>
    )
}