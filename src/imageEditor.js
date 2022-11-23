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

        {canvasSize && shapePath && (
          <ShapeCanvas
            height={canvasSize.height}
            width={canvasSize.width}
            imageFile={imageFile}
            shapePath={shapePath}
            onDelete={() => setShapePath(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ImageEditor;
