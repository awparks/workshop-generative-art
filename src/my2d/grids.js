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
    const count = 50;
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

  const points = createGrid().filter(() => random.value() > 0.5);
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

      // context.beginPath();
      // context.arc(x, y,  radius * width, 0, Math.PI * 2, false);
      context.save();
      context.fillStyle = color;
      // context.fill();
      // context.lineWidth = 0;
      // context.strokeStyle = '#c55353';
      // context.stroke();
      context.font = `${radius * width}px "calibri"`;
      // context.fontStyle = 'italic';
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText('~', 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);