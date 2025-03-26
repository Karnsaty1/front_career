import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Navbar = () => {
  const { id } = useParams();

  const generateLink = (path) => {
    const uniqueId = id || uuidv4(); 
    return `/${path}/${uniqueId}`;
  };

  return (
    <>
      <style>
        {`
        /* Navbar Styles */
        .navbar {
          background-color: #ffffff;
          border-bottom: 2px solid #f1f1f1;
          padding: 10px 15px;
        }

        .navbar-brand {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }

        .navbar-brand:hover {
          color: #007bff;
        }

        .nav-link {
          color: #555;
          font-size: 1rem;
          margin-right: 15px;
        }

        .nav-link:hover {
          color: #007bff;
        }

        .navbar-toggler {
          border: none;
          outline: none;
        }

        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 102, 0, 1)' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
        }

        .navbar-toggler:hover .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(0, 123, 255, 1)' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
          transform: scale(1.1);
        }

        .collapse {
          justify-content: flex-end;
        }
        `}
      </style>

      <nav className="navbar navbar-expand-lg sticky-navbar bg-white bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand">
            CarrerConnect
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to={generateLink('card')}>
                  Post
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={generateLink('job')}>
                  Jobs/Internships
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={generateLink('prep')}>
                  Prep
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={generateLink('event')}>
                  Events
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
