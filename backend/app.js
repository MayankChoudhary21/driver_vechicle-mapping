const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://gnopiabgtlowtqtoecwd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdub3BpYWJndGxvd3RxdG9lY3dkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzQ4MTI4MSwiZXhwIjoyMDM5MDU3MjgxfQ.SQan2wUbuAxkXF9WFrkqgve7XRFB7nJ5RkC_GKNEZdE';
const supabase = createClient(supabaseUrl, supabaseKey)
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/fetchDrivers', async (req, res) => {
    const u_loc = req.query.loc;
    try{
        const {data, error} = await supabase.from('Driver').select('name').eq('location', u_loc);
        if (error) throw error;
        res.json(data);
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server Error'});
    }
});

app.get('/fetchCars', async (req, res) => {
    try{
        const {data, error} = await supabase.from('Vehicle').select('License');
        if (error) throw error;
        res.json(data);
    }catch (err){
        console.log(err);
        res.status(500).json({message: 'Server Error'});
    }
});

app.get('/pushAssignment', async (req, res) => {
    const u_driver = req.query.name;
    const u_license = req.query.license;
    const u_startTime = req.query.sTime;
    const u_endTime = req.query.eTime;
    try{
        const {data, error} = await supabase.from('Assignment').insert([{ driver: u_driver, license: u_license, startTime: u_startTime, endTime: u_endTime}]);
        if (error){
            throw error;
        }
        res.json(data);
    }catch (err){
        res.status(500).json({message: 'Server Error'});
    }
});

app.get('/editAssignment', async (req, res) => {
    const u_status = req.query.status;
    const u_id = req.query.id;
    try{
        const {data, error} = await supabase.from('Assignment').update({status : u_status}).eq('id', u_id);
    }catch (err){
        res.status(500).json({message: 'Server Error'});
    }
});

app.get('/checkConflict', async (req,res) => {
    const u_driver = req.query.driver;
    const u_license = req.query.license;
    const u_startTime = req.query.sTime;
    const u_endTime = req.query.eTime;
    try{
        const {data, error} = await supabase.from('Assignment').select('driver,license,startTime,endTime').eq('driver', u_driver).eq('license', u_license);;
        if (error) throw error;
        const newStartTime = new Date(u_startTime).getTime();
        const newEndTime = new Date(u_endTime).getTime();
        let conflict = false;
        for (const assignment of data) {
            const existingStartTime = new Date(assignment.startTime).getTime();
            const existingEndTime = new Date(assignment.endTime).getTime();

            // Check if the new time range overlaps with any existing assignment
            if (
                (newStartTime < existingEndTime && newEndTime > existingStartTime) ||
                (newStartTime <= existingStartTime && newEndTime >= existingEndTime)
            ) {
                conflict = true;
                break;
            }
        }
        res.send(conflict);
    }catch (err){
        res.status(500).json({message: "Server Error"});
    }
});

app.get('/fetchsTime', async (req, res) => {
    try{
        const {data, error} = await supabase.from('Assignment').select('startTime');
        res.json(data);
    }catch (err){
        res.status(500).json({message: 'Server Error'});
    }
});

app.get('/fetchAssign', async (req,res) => {
    try{
        const {data, error} = await supabase.from('Assignment').select('*');
        res.json(data);
    }catch (err){
        res.status(500).json({message: 'Server Error'});
    }
})
app.get('/fetchLastId', async (req, res) => {
    try{
        const {data, error} = await supabase.from('Assignment').select('id');
        res.json(data);
    }catch (err){
        res.status(500).json({message: 'Server Error'});
    }
})

app.get('/fetchLoc', async (req, res) => {
    try{
        const {data, error} = await supabase.from('Driver').select('location');
        res.json(data);
    }catch (err){
        res.status(500).json({message: 'Server Error'});
    }
})

app.get('/pushDriverData', async (req, res) => {
    const id = req.query.id;
    const name= req.query.name;
    const num = req.query.num;
    const loc = req.query.loc;
    const em = req.query.em;
    try{
        const {data,error} = await supabase.from('Driver').insert([{driver_id: id, name: name, phone: num, location: loc, email: em}]);
        if(error) throw error;
        res.json(data);
    }catch (err){
        console.log(err);
        res.status(500).json({message: 'Server Error'});
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
