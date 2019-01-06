import canvasSketch from 'canvas-sketch';
import { lerp } from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';

const settings = {
  dimensions: [ 2048, 2048]
};

random.setSeed(100000);

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 20;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push({
          position: [ u, v ],
          radius: random.range(10, 75),
          stroke: random.range(5, 10),
        });
      }
    }
    return points;
  }

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 200;

  return ({ context, width, height }) => {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const {
        position,
        radius,
        stroke
      } = data;
      const [ u, v ] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.fillStyle = 'pink';
      context.fill();
      context.lineWidth = radius / 5;
      context.strokeStyle = '#c55353';
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);