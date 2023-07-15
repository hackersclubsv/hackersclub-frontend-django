import React from 'react'
import { User } from '../types/types'


const UserProfile = (props: {user:User}) => {
  return (
    <div className='container'>
      <h2>User Profile</h2>
      <ul className="list-group">
          <li className='list-group-item'>Username: {props.user.username}</li>
          <li className='list-group-item'>Email: {props.user.email}</li>
          <li className='list-group-item'>Bio: {props.user.bio}</li>
          <li className='list-group-item'>Role: {props.user.role}</li>
          <li className='list-group-item'>Created: {props.user.created}</li>
      </ul>
    </div>
  )
}

export default UserProfile