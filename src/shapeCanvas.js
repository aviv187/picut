import { useEffect, useRef } from "react";
import "./imageEditor.css";

const ShapeCanvas = ({ height, width, imageFile, shapePath, onDelete }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawShape = () => {
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

    drawShape(canvas, imageFile);
  }, [imageFile, width, height, shapePath]);

  return (
    <>
      <div className="canvases_container">
        <canvas
          ref={canvasRef}
          id="shape-canvas"
          width={width}
          height={height}
        />
      </div>

      <button onClick={onDelete}>delete piece</button>
    </>
  );
};

export default ShapeCanvas;
