import react from 'react';
import { useNavigate } from 'react-router-dom';
import AddRoomForm from '../components/AddRoomForm';

const AddBatchPage = () => {
    const navigate = useNavigate();

    const handleAddBatch = async (batchData) => {
        navigate('/batches');
    };

    return(
        <div>
            <h1>Add New Batch</h1>
            <AddRoomForm onAddBatch={handleAddBatch} />
        </div>
    );
};

export default AddBatchPage;