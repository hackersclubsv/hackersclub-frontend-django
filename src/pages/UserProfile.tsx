import React from 'react'


const UserProfile = () => {
  return (
    <div className='container'>
      <h2>User Profile</h2>
      <ul className="list-group">
          <li className='list-group-item'>Username:</li>
          <li className='list-group-item'>Email: </li>
          <li className='list-group-item'>Bio: </li>
          <li className='list-group-item'>Role: </li>
          <li className='list-group-item'>Created: </li>
      </ul>
    </div>
  )
}

export default UserProfile