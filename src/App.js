import { useState } from "react";
import "./App.css";
import ImageEditor from "./imageEditor";
import ImagesSelector from "./imagesSelector";

function App() {
  const [currentImage, setCurrentImage] = useState(null);

  return (
    <div className="App">
      {!currentImage && <ImagesSelector selectImage={setCurrentImage} />}
      {currentImage && (
        <>
          <button onClick={() => setCurrentImage(null)}>back</button>
          <ImageEditor imageFile={currentImage} />
        </>
      )}
    </div>
  );
}

export default App;
