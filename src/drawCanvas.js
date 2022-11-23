import { useCallback, useEffect, useRef, useState } from "react";
import "./imageEditor.css";

const DrawCanvas = ({ height, width, getShapePath, isShapeSet }) => {
  const canvasRef = useRef();

  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);
  const [shapePath, setShapePath] = useState([]);

  const getMouseLocation = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    return { x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop };
  };

  const onMouseMoveOnCanvas = useCallback(
    (e) => {
      if (!isPainting) {
        return;
      }

      const newMousePosition = getMouseLocation(e);

      if (mousePosition) {
        drawLine(mousePosition, newMousePosition);
        setMousePosition(newMousePosition);
      }
    },
    [isPainting, mousePosition]
  );

  const drawLine = (originalMousePosition, newMousePosition) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = "grey";
      ctx.lineJoin = "round";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(originalMousePosition.x, originalMousePosition.y);
      ctx.lineTo(newMousePosition.x, newMousePosition.y);
      ctx.closePath();

      ctx.stroke();
    }
  };

  const closeLine = () => {
    if (shapePath.length < 10) {
      setShapePath([]);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();

    ctx.moveTo(shapePath[0].x, shapePath[0].y);
    for (const pos of shapePath) {
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "grey";
    ctx.fill();

    getShapePath(shapePath);
    setShapePath([]);
  };

  useEffect(() => {
    if (!mousePosition) {
      return;
    }

    setShapePath((oldArr) => [...oldArr, mousePosition]);
  }, [mousePosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (isShapeSet || !canvas) {
      return;
    }
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
  }, [isShapeSet, canvasRef]);

  return (
    <canvas
      className="draw_canvas"
      ref={canvasRef}
      id="draw-canvas"
      width={width}
      height={height}
      onMouseDown={(e) => {
        if (isShapeSet) {
          return;
        }

        const mousePosition = getMouseLocation(e);

        if (mousePosition) {
          setIsPainting(true);
          setMousePosition(mousePosition);
        }
      }}
      onMouseUp={() => {
        setIsPainting(false);
        closeLine();
      }}
      onMouseMove={onMouseMoveOnCanvas}
    />
  );
};

export default DrawCanvas;
