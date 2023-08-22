import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "../api/axios";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import AvatarUpload from "../components/AvatarUpload";

const UpdateProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    caption: user?.caption || "",
    bio: user?.bio || "",
    currentClasses: user?.currentClasses.join(", ") || "",
    program: user?.program || "",
    admissionDate: user?.admissionDate || "",
    facebook: user?.socialLinks?.facebook || "",
    twitter: user?.socialLinks?.twitter || "",
    linkedin: user?.socialLinks?.linkedin || "",
    github: user?.socialLinks?.github || "",
    instagram: user?.socialLinks?.instagram || "",
    blog: user?.socialLinks?.blog || "",
  });
  const socialLinksData = {
    facebook: formData.facebook,
    twitter: formData.twitter,
    linkedin: formData.linkedin,
    github: formData.github,
    instagram: formData.instagram,
    blog: formData.blog,
  };
  useEffect(() => {
    if (user) {
      setFormData({
        caption: user.caption || "",
        bio: user.bio || "",
        currentClasses: user.currentClasses.join(", ") || "",
        program: user.program || "",
        admissionDate: user.admissionDate || "",
        facebook: user?.socialLinks?.facebook || "",
        twitter: user?.socialLinks?.twitter || "",
        linkedin: user?.socialLinks?.linkedin || "",
        github: user?.socialLinks?.github || "",
        instagram: user?.socialLinks?.instagram || "",
        blog: user?.socialLinks?.blog || "",
      });
    }
  }, [user]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleUpdateProfile = async () => {
    const response = await axios.patch(
      `/users/${user._id}`,
      {
        ...formData,
        socialLinks: socialLinksData,
      },
    );

    if (response.status !== 200) {
      // handle error
    }

    // Refresh user data after successful update
    const updatedUser = response.data;
    setUser(updatedUser);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <AvatarUpload user={user} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Box mb={2}>
          <TextField
            name="caption"
            value={formData.caption}
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="bio"
            value={formData.bio}
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="currentClasses"
            value={formData.currentClasses}
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="program"
            value={formData.program}
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="admissionDate"
            value={formData.admissionDate}
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="facebook"
            value={formData.facebook}
            placeholder="https://www.facebook.com/your-profile"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="twitter"
            value={formData.twitter}
            placeholder="https://www.twitter.com/your-profile"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="github"
            value={formData.github}
            placeholder="https://www.github.com/your-profile"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="linkedin"
            value={formData.linkedin}
            placeholder="https://www.linkedin.com/your-profile"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="instagram"
            value={formData.instagram}
            placeholder="https://www.instagram.com/your-profile"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="blog"
            value={formData.blog}
            placeholder="https://www.your-blog.com"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </Button>
      </Grid>
    </Grid>
  );
};

export default UpdateProfile;
