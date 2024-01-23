import { useEffect, useState } from "react";
import { Alert, Box, Link, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import getting_started from "../../assets/wiki/getting_started.md";
import campus_useful_links from "../../assets/wiki/campus_useful_links.md";
import learning_resources from "../../assets/wiki/learning_resources.md";
import useful_jobHunting_sites from "../../assets/wiki/useful_jobHunting_sites.md";
import event_hackers_club from "../../assets/wiki/event_hackers_club.md";
import frequently_asked_question from "../../assets/wiki/frequently_asked_question.md";
import housing_in_sv from "../../assets/wiki/housing_in_sv.md";
import places_to_visit from "../../assets/wiki/places_to_visit.md";
import foods_near_campus from "../../assets/wiki/foods_near_campus.md";
import tech_attractions_in_SV from "../../assets/wiki/tech_attractions_in_SV.md";

const contents = {
  getting_started,
  campus_useful_links,
  learning_resources,
  useful_jobHunting_sites,
  event_hackers_club,
  frequently_asked_question,
  housing_in_sv,
  places_to_visit,
  foods_near_campus,
  tech_attractions_in_SV,
};

const WikiContent = ({ content: fileName }) => {
  const [content, setContent] = useState("");

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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          children={content}
          components={{
            img: ({ node, ...props }) => (
              <img {...props} alt="" style={{ maxWidth: "100%" }} />
            ),
            p: ({ node, ...props }) => <Typography {...props} paragraph />,
          }}
        />
      ) : (
        <>
          <Typography variant="h5">Welcome to San Jose Campus!</Typography>
          <Typography>Please select a topic from the sidebar.</Typography>
        </>
      )}
      <Alert severity="info">
        <Typography>
          Have questions? <Link href="/community">Discuss with others</Link> or{" "}
          <Link href="/about">Contact Us!</Link> <br />
          Interested in contributing to this post?
          <Link href="https://github.com/hackersclubsv/hackersclub-frontend-django/tree/main/src/assets/wiki">
            Create a pull request on our GitHub!
          </Link>
        </Typography>
      </Alert>
    </Box>
  );
};

export default WikiContent;
