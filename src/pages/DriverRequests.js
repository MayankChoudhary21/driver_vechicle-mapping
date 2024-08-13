import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles//DriverRequests.css'; // Import the CSS file

function DriverRequests() {
    const [assignment, setAssignment] = useState([]);

    useEffect(() => {
        const getDetails = async () => {
            const data = await axios.get('http://localhost:5000/fetchAssign');
            setAssignment(data.data);
        };
        getDetails();
    }, []);

    const handleApprove = (id) => {
        console.log(`Approved request with ID: ${id}`);
        setAssignment(prevRequests =>
            prevRequests.map(req =>
                req.id === id ? { ...req, status: true } : req
            )
        );

        axios.get(`http://localhost:5000/editAssignment?id=${id}&status=${true}`);
    };

    const handleReject = (id) => {
        console.log(`Rejected request with ID: ${id}`);
        setAssignment(prevRequests =>
            prevRequests.map(req =>
                req.id === id ? { ...req, status: false } : req
            )
        );

        axios.get(`http://localhost:5000/editAssignment?id=${id}&status=${false}`);
    };

    return (
        <div className="driver-requests-container">
            <h1>Driver Requests</h1>
            <table className="driver-requests-table">
                <thead>
                    <tr>
                        <th>Driver Name</th>
                        <th>Request Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assignment.map((request) => (
                        <tr key={request.id}>
                            <td>{request.driver}</td>
                            <td>{request.startTime}</td>
                            <td>
                                {request.status === null ? (
                                    <>
                                        <button onClick={() => handleApprove(request.id)}>
                                            Approve
                                        </button>
                                        <button onClick={() => handleReject(request.id)}>
                                            Reject
                                        </button>
                                    </>
                                ) : request.status ? (
                                    <span className="status-accepted">Request Accepted</span>
                                ) : (
                                    <span className="status-rejected">Request Rejected</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DriverRequests;
