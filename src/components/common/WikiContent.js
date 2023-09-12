import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Link, Alert } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import getting_started from '../../assets/wiki/getting_started.md';
import campus_introduction from '../../assets/wiki/campus_introduction.md';
import transportation from '../../assets/wiki/transportation.md';
import academic_resources from '../../assets/wiki/academic_resources.md';
import study_materials from '../../assets/wiki/study_materials.md';

const WikiContent = ({ content: fileName }) => {
  const [content, setContent] = useState('');
  const contents = useMemo(() => ({
    getting_started,
    campus_introduction,
    transportation,
    academic_resources,
    study_materials,
  }), []);

  useEffect(() => {
    if (!fileName) {
      return;
    }
    if (contents[fileName]) {
      fetch(contents[fileName])
        .then((response) => response.text())
        .then((text) => {
          setContent(text);
        });
    }
  }, [fileName, contents]);

  return (
    <Box>
      {fileName ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} children={content} />
      ) : (
        <>
          <Typography variant="h5">Welcome to San Jose Campus!</Typography>
          <Typography>Please select a topic from the sidebar.</Typography>
        </>
      )}
      <Alert severity="info">
        <Typography>
          Have questions? <Link href="/community">Discuss with others</Link> or <Link href='/about'>Contact Us!</Link> <br />
          Interested in contributing to this post?   
          <Link href="https://github.com/hackersclubsv/hackersclub-frontend-django/tree/main/src/assets/wiki">Create a pull request on our GitHub!</Link>
        </Typography>
      </Alert>
    </Box>
  );
};

export default WikiContent;
