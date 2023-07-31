import React from 'react';
import { ListGroup, Container } from 'react-bootstrap';
import { sidebarData } from './sidebarData';

const Sidebar = (props: {setContent: React.Dispatch<React.SetStateAction<string>>}) => {

  return (
    <Container className="sidebar">
      <ListGroup>
        {sidebarData.map((item, index) => (
          <ListGroup.Item action key={index} onClick={(e) => props.setContent(item.content)}>
            {item.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Sidebar;
