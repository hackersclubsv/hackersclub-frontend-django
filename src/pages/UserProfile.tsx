import React from 'react'
import { exampleuser } from '../dummy/exampleuser';


const UserProfile = () => {
  return (
    <div className='container'>
      <h2>User Profile</h2>
      <ul className="list-group">
          <li className='list-group-item'>Username: {exampleuser.username}</li>
          <li className='list-group-item'>Email: {exampleuser.email}</li>
          <li className='list-group-item'>Bio: {exampleuser.bio}</li>
          <li className='list-group-item'>Role: {exampleuser.role}</li>
      </ul>
    </div>
  )
}

export default UserProfile