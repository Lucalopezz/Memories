import { NavLink, Link } from "react-router-dom";

import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
    <h2>
      <Link to="/">Memories</Link>
    </h2>
    <ul>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-memory"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Adicionar memória
        </NavLink>
      </li>
    </ul>
  </nav>
  )
}

export default Navbar
