import PostsList from "./PostList";
import React from "react";
import { UserContext } from "../contexts/UserContext.js";
import './Home.css'; // Assuming this file contains the necessary CSS
function Community() {
  const { user } = React.useContext(UserContext);
  return (
    <div style={{ position: 'relative' }}>
         {user 
        ? <PostsList /> 
        :(
          <div className="blurEffect" > 
         <p style={{position: 'absolute'}}>Information</p>
        </div>
      )
     }    
    </div>
  );
}

export default Community;
