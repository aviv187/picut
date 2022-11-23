import { useState } from "react";
import "./App.css";
import ImageEditor from "./imageEditor";
import ImagesSelector from "./imagesSelector";

function App() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  const addImage = (file) => {
    setImages((oldArr) => [...oldArr, file]);
  };

  const deleteImage = (index) => {
    setImages((oldArr) => {
      const newArr = [...oldArr];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  return (
    <div className="App">
      {!currentImage && (
        <div>
          <ImagesSelector
            selectImage={setCurrentImage}
            images={images}
            addImage={addImage}
            deleteImage={deleteImage}
          />
        </div>
      )}
      {currentImage && (
        <>
          <ImageEditor imageFile={currentImage} />

          <div className="back_button_container">
            <button
              className="back_button"
              title="go back to picture selection"
              onClick={() => setCurrentImage(null)}
            >
              {"< back"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
