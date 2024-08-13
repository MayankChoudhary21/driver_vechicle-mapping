import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RequestsPage() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const res = await axios.get('http://localhost:5000/api/requests');
            setRequests(res.data);
        };
        fetchRequests();
    }, []);

    const handleResponse = async (id, status) => {
        await axios.patch(`http://localhost:5000/api/requests/${id}`, { status });
        setRequests(requests.filter(req => req._id !== id));
    };

    return (
        <div>
            {requests.map(request => (
                <div key={request._id}>
                    <p>{request.vehicle} - Request by {request.driver}</p>
                    <button onClick={() => handleResponse(request._id, 'Accepted')}>Accept</button>
                    <button onClick={() => handleResponse(request._id, 'Rejected')}>Reject</button>
                </div>
            ))}
        </div>
    );
}

export default RequestsPage;
