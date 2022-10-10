import { ctx, height, width } from '../../stuff.mjs';

class Base {
	constructor({
		pos = { x: Math.random() * width - 50, y: Math.random() * height - 50 },
		color,
	}) {
		this.pos = pos;
		this.life = 100;
		this.currency = 0;
		this.color = color;
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.pos.x, this.pos.y, 50, 50);
	}
}

let ally = new Base({ color: 'blue' });
let enemy = new Base({ color: 'red' });

export { ally, enemy };
