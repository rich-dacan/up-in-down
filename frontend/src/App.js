import React, { useEffect, useState } from "react";
import api from "./api";
import "./App.css";
import { TbCloudComputing } from "react-icons/tb";
import imageService from "./services/imageService";

function App() {
  const [file, setFile] = useState();
  const [imageKeys, setImageKeys] = useState([]);
  const [images, setImages] = useState([]);
  // console.log(images);

  api.get("/images").then(res => setImages(res.data));

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file);
  };

  const submit = async event => {
    event.preventDefault();

    const result = await imageService.postImage({ image: file });

    const imageKey = result.imagePath.replace(/^\/images\//, "");

    setImageKeys([imageKey, ...imageKeys]);
  };

  useEffect(() => {
    api.get("/images").then(res => setImageKeys(res.data));
  }, []);

  return (
    <div className="container">
      <h1>
        {" "}
        Up in down <TbCloudComputing style={{ marginLeft: "20px" }} />
      </h1>
      <form onSubmit={submit} className="form">
        <input
          onChange={fileSelected}
          type="file"
          name="uploadImage"
          accept="image/png, image/jpeg, image/wepm"
        />
        <button type="submit" className="submit__button">
          Submit
        </button>
      </form>

      <div className="image__container">
        {imageKeys?.map(key => (
          <div key={key} className="image__wrapper">
            <img
              src={`http://localhost:3333/images/${key}`}
              alt={key}
              className="image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
