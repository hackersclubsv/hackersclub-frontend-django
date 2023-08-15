import React from 'react';
import { List, ListItem, Box, Container } from "@mui/material";
import { SidebarData } from './SidebarData';

const Sidebar = ({ setContent }) => {
  return (
    <Container>
      <Box width={200}>
        <List>
          {SidebarData.map((item, index) => (
            <ListItem button key={index} onClick={() => setContent(item.content)}>
              {item.title}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Sidebar;

