import canvasSketch from 'canvas-sketch';

const settings = {
  dimensions: 'letter',
  pixelsPerInch: 300
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width / 2, height / 2, 200, 0, Math.PI * 2, false);
    context.fillStyle = '#c55353';
    context.fill();
    context.lineWidth = 20;
    context.strokeStyle = 'white';
    context.stroke();
  };
};

canvasSketch(sketch, settings);