import { ctx, height, width } from '../../stuff.mjs';

class Unit {
	constructor(pos = { x: 0, y: 0 }, color = '#55E45D') {
		this.pos = pos;
		this.height = 10;
		this.width = 10;
		this.selected = false;
		this.moving = false;
		this.x = 0;
		this.y = 0;
		this.color = color;
		this.lastPos = {};
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
	}
	update() {
		this.draw();
		if (this.moving) {
			this.pos.x += this.x;
			this.pos.y += this.y;
		}
		if (this.selected) {
			ctx.strokeStyle = 'blue';
			ctx.lineWidth = 4;
			ctx.strokeRect(
				this.pos.x - 2,
				this.pos.y - 2,
				this.width + 3,
				this.height + 3,
			);
		}
	}
}

let player = [];
for (let i = 0; i < 1; i++) {
	let x = Math.random() * width * 0.9;
	let y = Math.random() * height * 0.9;
	player.push(new Unit({ x: x, y: y }, 'lime'));
}
let enemies = [];
for (let i = 0; i < 1; i++) {
	let x = Math.random() * width * 0.9;
	let y = Math.random() * height * 0.9;
	enemies.push(new Unit({ x: x, y: y }, 'red'));
}
export { player, enemies, Unit };
