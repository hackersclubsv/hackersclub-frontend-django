import { useAuth } from "../../hooks/useAuth";

const Navbar = ({isLogin} : {isLogin: Boolean}) => {
  
  const {user, logout} = useAuth();
  console.log("user in nav bar", user);
  const loginComponent = (
    user !== null ? (
      <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item">
      <a className="nav-link" href="/userprofile">{user.name}</a>
      </li>
      <li className="nav-item">
      <button className="nav-link" onClick={logout}>Logout</button>
      </li>
    </ul> 
    ) : 
    (
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
        <a className="nav-link" href="/login">Login</a>
        </li>
      </ul>
    )
  )

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <h1><a className="navbar-brand" href="/">SV Hackers Club</a></h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href='/'>Home</a>
          </li> 
          <li className="nav-item">
            <a className="nav-link" href='/campusinfo'>Campus Info</a>
          </li> 
          <li className="nav-item">
            <a className="nav-link" href='/careerdev'>Career Dev</a>
          </li> 
          <li className="nav-item">
            <a className="nav-link" href='/techdojo'>Tech Dojo</a>
          </li> 
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