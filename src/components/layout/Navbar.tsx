import React, { useState } from 'react'
import { routes } from '../../routes/routes'

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  
  const loginComponent = (
    isLogin ? (
      <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item">
      <a className="nav-link" href="/">Username</a>
      </li>
      <li className="nav-item">
      <button className="nav-link" onClick={() => setIsLogin(false)}>Logout</button>
      </li>
    </ul> 
    ) : 
    (
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
        <button className="nav-link" onClick={() => setIsLogin(true)}>Login</button>
        </li>
      </ul>
    )
  )
      
  const navlist = routes.map((route, id) => (
    <li className="nav-item" key={id}>
      <a className="nav-link" href={route.path}>{route.name}</a>
    </li> 
  ))

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">SV Hackers Club</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navlist}
          </ul>
          {loginComponent}

        </div>
      </div>
      <div>

      </div>
    </nav>

  )
}

export default Navbar