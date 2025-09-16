import React, {useState,useEffect, use} from "react";
import axios from "axios";
import BatchList from "../components/BatchList";

const BatchListPage = () => {
    const [batches, setBatches] = useState([]);

    useEffect(() => {
        const featchBatches = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/batches');
                setBatches(response.data);
            } catch (error) {
                console.error("Error fetching batches:", error);
            }
        };
        featchBatches();
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this batch?')){
            try{
                await axios.delete(`http://localhost:5000/api/batches/${id}`);
                featchBatches();
            }catch(error){
                console.error("Error deleting batch:",error);
            }
        }
    };

    return(
        <div>
            <h1>Manage Batches</h1>
            <BatchList batches={batches} onDelete={handleDelete} />
        </div>
    );
};

export default BatchListPage;