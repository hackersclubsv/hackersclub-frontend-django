import React from 'react'
import PostList from '../components/common/PostList'
import { exampleposts } from '../dummy/exampleposts'


const CampusInfo = () => {
  return (
    <div className='container'>
      <PostList postlist={exampleposts} /> 
    </div>
  )
}

export default CampusInfo