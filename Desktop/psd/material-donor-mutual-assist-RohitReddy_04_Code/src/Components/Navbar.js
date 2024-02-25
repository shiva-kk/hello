import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from React Router
import myImage from './bworks.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "white", height: "60px" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><img src={myImage} alt="Description of the image" style={{ width: '100px', height: '50px' }} /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" style={{ fontSize: "20px", paddingLeft: "10px" }}>
              {/* Use Link component for navigation */}
              <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
            </li>
            <li className="nav-item" style={{ fontSize: "20px", paddingLeft: "10px" }}>
              {/* Use Link component for navigation */}
              <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
            </li>
            <li className="nav-item" style={{ fontSize: "20px", paddingLeft: "10px" }}>
              <Link className="nav-link" to="/about">About</Link> {/* Example link for About page */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
