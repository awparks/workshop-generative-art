import canvasSketch from 'canvas-sketch';
import { lerp } from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';

const settings = {
  dimensions: [ 2048, 2048]
};

const sketch = () => {
  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);

  const createGrid = () => {
    const points = [];
    const count = 6;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.15;
        points.push({
          position: [ u, v ],
          radius,
          rotation: random.noise2D(u, v),
          palette,
        });
      }
    }
    return points;
  }

  const points = createGrid();
  const margin = 200;

  return ({ context, width, height }) => {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const {
        position,
        radius,
        rotation,
        palette
      } = data;
      const [ u, v ] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      const color = random.pick(palette);

      context.beginPath();
      context.arc(x, y,  5, 0, Math.PI * 2, false);
    //   context.save();
      context.fillStyle = 'black';
      context.fill();
      // context.lineWidth = 0;
      // context.strokeStyle = '#c55353';
      // context.stroke();
    });
    const point1 = random.pick(points);
    const point2 = random.pick(points);
    console.log(point1, point2);
    context.beginPath();
    context.moveTo(
      lerp(margin, width - margin, point1.position[0]),
      lerp(margin, width - margin, point1.position[1])
    );
    context.lineTo(
      lerp(margin, width - margin, point2.position[0]),
      lerp(margin, width - margin, point2.position[1])
    );
    context.lineWidth = 5;
    context.strokeStyle = '#000000';
    context.stroke();
  };
};

canvasSketch(sketch, settings);