import React, { useState } from 'react';

const Register = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate password length
        if (credentials.password.length < 5) {
            setErrorMessage("Password must be at least 5 characters");
            return;
        }
    
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
    
        try {
            const json = await response.json();
            console.log(json);
    
            if (response.ok) {
                setSuccessMessage("Registration successful");
                setTimeout(() => {
                    window.location.href = '/Login';
                }, 3000); 
            } else {
                // Check if response status is 400 (Bad Request) and error message indicates email already exists
                if (response.status === 400 && json.error === "Sorry a user with this email already exists") {
                    setErrorMessage("Email already exists. Please login.");
                } else {
                    setErrorMessage(json.error || "Registration failed");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };
      

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='my-5 container'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default Register;