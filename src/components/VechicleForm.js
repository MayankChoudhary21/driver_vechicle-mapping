import React, { useState } from 'react';
import axios from 'axios';

function VehicleForm() {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:5000/api/vehicles', { make, model });
        setMake('');
        setModel('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Make" value={make} onChange={e => setMake(e.target.value)} required />
                <input type="text" placeholder="Model" value={model} onChange={e => setModel(e.target.value)} required />
                <button type="submit">Add Vehicle</button>
            </form>
        </div>
    );
}

export default VehicleForm;
