import { useEffect, useRef, useState } from "react";
import "./imageEditor.css";

const ShapeCanvas = ({ height, width, imageFile, shapePath, onDelete }) => {
  const canvasRef = useRef();
  const [canMoveShape, setCanMoveShape] = useState(false);
  const [shapePos, setShapePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawImage = () => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = function (e) {
        const myImage = new Image();

        myImage.src = e.target.result;
        myImage.onload = () => {
          ctx.beginPath();
          ctx.moveTo(shapePath[0].x, shapePath[0].y);
          for (const pos of shapePath) {
            ctx.lineTo(pos.x, pos.y);
          }
          ctx.closePath();
          ctx.clip();

          ctx.drawImage(myImage, 0, 0);
        };
      };
    };

    drawImage(canvas, imageFile);
  }, [imageFile, width, height, shapePath]);

  return (
    <div
      className="shape_canvas_container"
      style={{ top: shapePos.y, left: shapePos.x }}
      onMouseDown={() => setCanMoveShape(true)}
      onMouseUp={() => setCanMoveShape(false)}
      onMouseMove={(e) => {
        if (canMoveShape) {
          setShapePos({ x: e.clientX - width, y: e.screenY - height });
        }
      }}
    >
      <canvas ref={canvasRef} id="shape-canvas" width={width} height={height} />

      <button onClick={onDelete}>x</button>
    </div>
  );
};

export default ShapeCanvas;
