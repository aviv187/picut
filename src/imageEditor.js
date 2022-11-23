import { useCallback, useState } from "react";
import DrawCanvas from "./drawCanvas";
import ImageCanvas from "./imageCanvas";
import "./imageEditor.css";
import ShapeCanvas from "./shapeCanvas";

const ImageEditor = ({ imageFile }) => {
  const [canvasSize, setCanvasSize] = useState(null);
  const [shapePath, setShapePath] = useState(null);

  const getCanvasSize = useCallback((size) => {
    setCanvasSize(size);
  }, []);

  const getShapePath = useCallback((arr) => {
    setShapePath(arr);
  }, []);

  return (
    <div>
      <h1>Please draw a path to create a puzzle piece</h1>
      <br />

      <div className="canvases_container">
        <ImageCanvas imageFile={imageFile} getCanvasSize={getCanvasSize} />
        {canvasSize && (
          <DrawCanvas
            height={canvasSize.height}
            width={canvasSize.width}
            getShapePath={getShapePath}
            isShapeSet={!!shapePath}
          />
        )}
      </div>

      {canvasSize && shapePath && (
        <>
          <br />
          <ShapeCanvas
            height={canvasSize.height}
            width={canvasSize.width}
            imageFile={imageFile}
            shapePath={shapePath}
            onDelete={() => setShapePath(null)}
          />
        </>
      )}
    </div>
  );
};

export default ImageEditor;
