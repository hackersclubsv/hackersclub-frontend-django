import { useRef, useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import axios from "../api/axios";
import { Button, Slider } from "@mui/material";

function AvatarUpload({ user }) {
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (user && user.avatar) {
      setImage(user.avatar);
    }
  }, [user]);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    setImage(URL.createObjectURL(acceptedFiles[0]));
  };

  const handleSave = async () => {
    const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
    const formData = new FormData();
    formData.append("avatar", canvas);

    try {
      const response = await axios({
        method: "patch",
        url: `/users/${user._id}/upload`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <div>
      <Dropzone
        onDrop={onDrop}
        maxSize={5000000 /* 5MB */}
        accept={{"image/*": [".jpeg", ".png"]}}
        onDropRejected={() => alert("Invalid file type!")}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              style={{
                width: "300px",
                height: "300px",
                borderWidth: 2,
                borderColor: "#666",
                borderStyle: "dashed",
                borderRadius: 5,
              }}
            >
              <input {...getInputProps()} />
              {image && (
                <AvatarEditor
                  ref={editorRef}
                  image={image}
                  width={200}
                  height={200}
                  border={50}
                  scale={scale}
                  rotate={0}
                />
              )}
            </div>
          </section>
        )}
      </Dropzone>
      {image && (
        <div>
          <Slider
            min={1}
            max={3}
            step={0.01}
            value={scale}
            onChange={(e, value) => setScale(value)}
          />
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleSave}>
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}
export default AvatarUpload;
