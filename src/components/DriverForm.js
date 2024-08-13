import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function DriverForm() {
    const navigate = useNavigate();
    const [drivers, setDrivers] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loc, setLoc] = useState('');
    const [em, setEm] = useState('');
    const [id, setId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.get(`http://localhost:5000/pushDriverData?id=${id}&name=${name}&num=${phone}&loc=${loc}&em=${em}`).then((res) => {navigate('/home')});
        setName('');
        setPhone('');
        setLoc('');
        setEm('');
        setId('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Driver ID" value={id} onChange={e => setId(e.target.value)} required />
                <input type="text" placeholder="Driver Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="text" placeholder="Driver Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
                <input type="text" placeholder="Email" value={em} onChange={e => setEm(e.target.value)} required />
                <input type="text" placeholder="Location" value={loc} onChange={e => setLoc(e.target.value)} required />
                <button type="submit" onClick = {handleSubmit}>Add Driver</button>
            </form>
            <ul>
                {drivers.map(driver => (
                    <li key={driver.id}>{driver.name} - {driver.phone}</li>
                ))}
            </ul>
        </div>
    );
}

export default DriverForm;
