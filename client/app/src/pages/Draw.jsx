import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Draw() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvasRef.current.isDrawing = true;
  };

  const draw = (e) => {
    if (!canvasRef.current.isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = "#ec4899";
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  const stopDrawing = () => {
    canvasRef.current.isDrawing = false;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">
        🎨 Drawing Board
      </h1>

      <canvas
        ref={canvasRef}
        width={320}
        height={320}
        className="bg-white rounded-xl shadow mb-6"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <button
        onClick={() => navigate("/checkin")}
        className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition"
      >
        Back to Check-in
      </button>
    </div>
  );
}
