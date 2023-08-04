import React, { useState } from 'react'
import { Container, Tab, Tabs } from 'react-bootstrap'

import PostList from '../components/common/PostList'
import { exampleposts } from '../static_data/exampleposts'


const Community = () => {
  const [key, setKey] = useState('campus-life');
  return (
    <Container className='my-5'>
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k: any) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="campus-life" title="Campus Life">
          <PostList postlist={exampleposts} />
        </Tab>
        <Tab eventKey="career-dev" title="Career Development">
          <PostList postlist={exampleposts} />
        </Tab>
        <Tab eventKey="tech-dojo" title="Tech Dojo">
          <PostList postlist={exampleposts} />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default Community