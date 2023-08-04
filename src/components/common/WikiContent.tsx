import { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import getting_started from '../../assets/wiki/getting_started.md';
import campus_introduction from '../../assets/wiki/campus_introduction.md';
import transportation from '../../assets/wiki/transportation.md';

const WikiContent = (props: { content: string }) => {
  const [content, setContent] = useState('');
  const contents: any = { getting_started, campus_introduction, transportation };
  const file_name = props.content;
  console.log(file_name);

  useEffect(() => {
    if (!props.content) {
      return
    }
    if (contents[file_name]) {
      fetch(contents[file_name])
        .then((response) => response.text())
        .then((text) => {
          setContent(text);
        });
    }
  }, [file_name]);

  return (
    <Container className="wiki-content">
      {props.content ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} children={content} />
      ) : (
        <>
        <h2>Welcome to San Jose Campus!</h2>
        <p>Please select a topic on the left sidebar.</p>
        </>
      )}
      <Alert variant="light" className='wiki-info'>
          <p> 
            Have questions? <a href="/community">Discuss with others</a> or <a href='/about'>Contact Us!</a> <br />
            Wanna contribute to this post?   
            <a href="https://github.com/hackersclubsv/hackersclub-frontend-django/tree/main/src/assets/wiki">Create pull request to our GitHub!</a>
          </p>
      </Alert>
    </Container>
  );
};

export default WikiContent;
