import { Container } from "react-bootstrap"
import Sidebar from "../components/common/Sidebar"
import WikiContent from "../components/common/WikiContent"
import { useState } from "react";


const Resources = () => {
  const [content, setContent] = useState('');

  return (
    <Container className="wiki-layout my-5">
      <Sidebar setContent={setContent} />
      <WikiContent content={content} />
    </Container>
  )
}

export default Resources