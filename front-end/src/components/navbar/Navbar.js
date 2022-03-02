import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const location = useLocation();
    const path = location.pathname
    let studentsNavLinkClass = path.includes("/books") ? "nav-link" : "nav-link active"

    return (
        <nav className="navbar navbar-expand-lg navbar-dark cust-navbar text-center">
            <div className="container-fluid">
                <div className="navbar-brand p-0 d-flex align-items-center my-1">
                    <img src="/assets/images/logo.png" width="70px" />
                    <div> E-Library</div>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse cust-nav-items" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink
                                className={studentsNavLinkClass}
                                to="/students"
                            >
                                Students
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/books"
                            >
                                Books
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar