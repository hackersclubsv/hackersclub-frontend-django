import React from 'react'
import { Container } from 'react-bootstrap'
import PostList from '../components/common/PostList'
import { exampleposts } from '../static_data/exampleposts'

const CareerDev = () => {
  return (
    <Container>
      <PostList postlist={exampleposts} /> 
    </Container>
  )
}

export default CareerDev