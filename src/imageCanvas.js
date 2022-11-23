import { useEffect, useRef } from "react";

const ImageCanvas = ({ imageFile, getCanvasSize }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const drawImage = () => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = function (e) {
        const myImage = new Image();

        myImage.src = e.target.result;
        myImage.onload = () => {
          const width = myImage.width;
          const height = myImage.height;
          getCanvasSize({ width, height });

          canvas.width = width;
          canvas.height = height;
          context.drawImage(myImage, 0, 0);
        };
      };
    };

    drawImage(canvas, imageFile);
  }, [imageFile, getCanvasSize]);

  return <canvas id="image-canvas" width="0px" height="0px" ref={canvasRef} />;
};

export default ImageCanvas;
