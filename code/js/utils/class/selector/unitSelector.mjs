import { ctx } from '../../stuff.mjs';

class Selector {
	constructor() {
		this.pos = { x: undefined, y: undefined };
		this.lastPos = { x: undefined, y: undefined };
		this.height = 10;
		this.width = 10;
		this.draws = false;
	}
	draw() {
		if (this.draws) {
			ctx.strokeStyle = '#55E45D';
			ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
			ctx.fillStyle = 'rgba(85, 228, 93, 0.1)';
			ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
		}
	}
}

let selector = new Selector();

export { selector };
