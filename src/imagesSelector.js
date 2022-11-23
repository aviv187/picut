import { useState } from "react";
import "./App.css";

const ImageTypes = ["image/jpeg", "image/png"];

const ImagesSelector = ({ selectImage }) => {
  const [images, setImages] = useState([]);

  const onFileSelected = (event) => {
    const file = event.target.files[0];
    if (!file || !ImageTypes.includes(file["type"])) {
      return;
    }
    setImages((oldArr) => [...oldArr, file]);
    event.target.value = null;
  };

  const deleteFile = (index) => {
    setImages((oldArr) => {
      const newArr = [...oldArr];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  return (
    <div>
      <h1>Upload and Display Image</h1>
      {images.length > 0 && (
        <div>
          {images.map((img, i) => {
            return (
              <div key={`img_${i}`}>
                <img
                  alt="not fount"
                  width="300px"
                  height="400px"
                  src={URL.createObjectURL(img)}
                  onClick={() => selectImage(img)}
                />
                <button onClick={() => deleteFile(i)}>delete</button>
              </div>
            );
          })}
        </div>
      )}
      <input type="file" name="myImage" onChange={onFileSelected} />
    </div>
  );
};

export default ImagesSelector;
