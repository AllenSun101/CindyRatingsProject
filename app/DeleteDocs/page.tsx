'use client'
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function DeleteDocs(){

    const [formData, setFormData] = useState({Name: '', Category: ''});

    const mutation = useMutation({
        mutationFn: (params : object) => {
          return axios.post('http://localhost:3000/DeleteDocs/api', params);
        },
      })
    
    function HandleChange(event: any){
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    }
    
    function HandleSubmit(event: any){
        mutation.mutate({Name: formData.Name, Category: formData.Category});
    }

    return(
        <div className="bg-white py-24">
            <div className="text-4xl font-bold text-center">
                <h1>Delete Documents</h1>
            </div>
            <form className="w-1/2 mx-auto mt-6" onSubmit={HandleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input type="text" name="Name" placeholder="Name"
                        className="w-full mb-4 border border-purple-500 rounded-md py-2 px-4 border-2 focus:outline-none focus:ring focus:border-purple-500"
                        required onChange={HandleChange} value={formData.Name}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Category: Episodes, Characters, Songs, or Shorts</label>
                    <input type="text" name="Category" placeholder="Category"
                        className="w-full mb-4 border border-purple-500 rounded-md py-2 px-4 border-2 focus:outline-none focus:ring focus:border-purple-500"
                        required onChange={HandleChange} value={formData.Category}
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="text-lg bg-purple-500 text-white font-bold py-2 px-4 rounded-lg"> Submit </button>
                </div>
            </form>
            <div className="mt-12 flex justify-center">
                <img src="https://1.bp.blogspot.com/-MhYO1jF1hLQ/Xcvz-kx7RDI/AAAAAAADR18/8VE8ppDTyvI4WbGFRCLKYHws3hx_qhKdgCLcBGAsYHQ/w1200-h630-p-k-no-nu/Capture.PNG"/>
            </div>
        </div>   
    )
}

