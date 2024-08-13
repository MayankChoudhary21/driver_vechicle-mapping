import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AssignmentForm = ()=>  {
    const navigate = useNavigate();
    const [drivers, setDrivers] = useState([]);
    const [assignment, setAssignment] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [locList, setLocList] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [loc, setLoc] = useState();
    const [lastNum , setLastNum] = useState();  
    const [ids, setIds] = useState([]);
    const [prevAssign, setPrevAssign] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const driversRes = await axios.get('http://localhost:5000/fetchDrivers');
            setDrivers(driversRes.data);
            const vehicleRes = await axios.get('http://localhost:5000/fetchCars');
            setVehicles(vehicleRes.data);
            const location = await axios.get('http://localhost:5000/fetchLoc');
            setLocList(location.data);
            const ass = await axios.get('http://localhost:5000/fetchsTime');
            setAssignment(ass.data);
            const lastId = await axios.get('http://localhost:5000/fetchLastId');
            if(lastId.data == []){
                setLastNum(0);
            }else{
                setIds(lastId.data);
                setLastNum(ids[ids.length-1]+1);
            }
            const assign = await axios.get('http://localhost:5000/checkConflict');
            setPrevAssign(assign.data);

        };
        fetchData();

    }, []);

    const handleSubmit = async (e) => { 
        e.preventDefault();
        const conflict = await axios.get(`http://localhost:5000/checkConflict?driver=${selectedDriver}&license=${selectedVehicle}&sTime=${startTime}&eTime=${endTime}`);
            if(conflict.data == false){
                axios.get(`http://localhost:5000/pushAssignment?name=${selectedDriver}&license=${selectedVehicle}&sTime=${startTime}&eTime=${endTime}`).then(() => {navigate('/home')});
            }else{
                alert('Conflict');
            }
    };

    const locChange = async (e) =>{
        const driver = await axios.get(`http://localhost:5000/fetchDrivers?loc=${e}`);
        setDrivers(driver.data);
    };

    return (
        <div>
            <form>
                <select onChange={(e) => locChange(e.target.value)} value={loc}>
                    <option value="">Select Location</option>
                    {locList.map(loc => (
                        <option key={loc._id} value={loc._id}>{loc.location}</option>
                    ))}
                </select>
                <select onChange={(e) => setSelectedDriver(e.target.value)} value={selectedDriver}>
                    <option value="">Select Driver</option>
                    {drivers.map(driver => (
                        <option key={driver._id} value={driver._id}>{driver.name}</option>
                    ))}
                </select>
                <select onChange={(e) => setSelectedVehicle(e.target.value)} value={selectedVehicle}>
                    <option value="">Select Vehicle</option>
                    {vehicles.map(vehicle => (
                        <option key={vehicle._id} value={vehicle._id}>{vehicle.License}</option>
                    ))}
                </select>
                <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                <button type="submit" onClick={handleSubmit}>Schedule Assignment</button>
                <button type="home" onClick={() => {navigate('/home')}}>Home</button>
            </form>
        </div>
    );
}

export default AssignmentForm;
