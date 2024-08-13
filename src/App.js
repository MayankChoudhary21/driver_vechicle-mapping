import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AssignmentForm from './components/AssignmentForm';
import DriverRequests from './pages/DriverRequests';
import Login from './components/Login';
import DriverForm from './components/DriverForm';
import Logout from './components/Logout';
import { useNavigate } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<MainApp />} />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Initial redirect to login */}
        <Route path="*" element={<Navigate to="/home" />} /> {/* Redirect unknown routes to home after login */}
        <Route path="/assignments" element={<AssignmentForm />} />
        <Route path='/requests' element={<DriverRequests />} />
        <Route path='/DriverForm' element={<DriverForm />} />
      </Routes>
    </Router>
  );
}

function MainApp() {
    const navigate = useNavigate();

    return (
        <div className="main-app">
            <header>
                <h1>Vehicle-Driver Mapping System</h1>
            </header>
            <nav className="main-nav">
                <button className="button" onClick={() => navigate('/home')}>Home</button>
                <button className="button" onClick={() => navigate('/assignments')}>Assignments</button>
                <button className="button" onClick={() => navigate('/requests')}>Driver Requests</button>
                <button className="button" onClick={() => navigate('/DriverForm')}>Driver Form</button>
                <button className="button" onClick={() => navigate('/logout')}>Logout</button>
            </nav>
            <main className="main-content">
                <div>
                    <h2 className="section-title">Welcome to the Vehicle-Driver Mapping System</h2>
                    <p>
                        This system allows you to manage the assignment of drivers to vehicles efficiently. 
                        You can use the navigation buttons above to explore different features of the system, 
                        such as managing assignments, handling driver requests, and searching for available drivers.
                    </p>
                    <p>
                        Each section provides tools that help you streamline your operations and ensure smooth 
                        management of your fleet and drivers.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default App;
