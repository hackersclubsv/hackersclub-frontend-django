import { useFormik } from 'formik';
import { Button, TextField, Box, Select, MenuItem, Typography, InputLabel } from '@mui/material';

const PostFields = ({ categories, onSubmit, initialValues }) => {

  const formik = useFormik({
    initialValues: initialValues || {
      author: "",
      title: "",
      url: "",
      text: "",
      categoryId: "",
    },
    // You should use your validation schema here
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal" 
        fullWidth
        id="author" 
        label="Author"
        name="author"
        onChange={formik.handleChange}
        value={formik.values.author}
      />
      <TextField
        margin="normal" 
        fullWidth
        id="title" 
        label="Title"
        name="title"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      <TextField
        margin="normal" 
        fullWidth
        id="url" 
        label="Url"
        name="url"
        onChange={formik.handleChange}
        value={formik.values.url}
      />
      <TextField
        margin="normal" 
        fullWidth
        id="text" 
        label="Text"
        name="text"
        onChange={formik.handleChange}
        value={formik.values.text}
      />
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        id="categoryId"
        name="categoryId"
        value={formik.values.categoryId}
        label="Category"
        onChange={formik.handleChange}
      >
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <Button 
  			type="submit" 
  			fullWidth
  			variant="contained"
  			sx={{ mt: 3, mb: 2 }}>
        Submit
  	  </Button>
    </Box>
  );
}

export default PostFields;

