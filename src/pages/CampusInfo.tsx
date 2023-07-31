import { Container } from "react-bootstrap"
import Sidebar from "../components/common/Sidebar"
import WikiContent from "../components/common/WikiContent"
import { useState } from "react";

import { sidebarData } from "../components/common/sidebarData";


const CampusInfo = () => {
  const [content, setContent] = useState('');

  return (
    <Container className="wiki-layout">
      <Sidebar setContent={setContent} />
      <WikiContent content={content} />
    </Container>
  )
}

export default CampusInfo