import { ally, enemy } from './js/utils/class/base/base.mjs';
import { selector } from './js/utils/class/selector/unitSelector.mjs';
import { enemies, player, Unit } from './js/utils/class/units/unit.mjs';
import { canvas, ctx, height, spawn_unit, width } from './js/utils/stuff.mjs';

spawn_unit.addEventListener('click', () => {
	let x = Math.random() * width * 0.9;
	let y = Math.random() * height * 0.9;
	player.push(new Unit({ x: x, y: y }, 'lime'));
});

function select(e) {
	selector.width = e.offsetX - selector.pos.x;
	selector.height = e.offsetY - selector.pos.y;
}
document.addEventListener('contextmenu', (e) => {
	e.preventDefault();
});
canvas.addEventListener('mousedown', (e) => {
	selector.pos.x = e.offsetX;
	selector.pos.y = e.offsetY;
	selector.width = 1;
	selector.height = 1;
	selector.draws = true;

	if (e.button == 2) {
		// const myAngle = Math.atan2(
		// 	e.offsetY - player.pos.y + player.h / 2 / 2,
		// 	e.offsetX - player.pos.x + player.w / 2,
		// );
		// x: Math.cos(myAngle)
		// y: Math.sin(myAngle)
		player.forEach((unit) => {
			let angle = Math.atan2(e.offsetY - unit.pos.y, e.offsetX - unit.pos.x);
			if (unit.selected) {
				unit.lastPos.x = e.offsetX;
				unit.lastPos.y = e.offsetY;
				// ctx.stroke();
				unit.x = Math.cos(angle) * 0.5;
				unit.y = Math.sin(angle) * 0.5;
				unit.moving = true;
			}
		});
		return;
	}
	canvas.addEventListener('mousemove', select);
});

canvas.addEventListener('mouseup', (e) => {
	selector.draws = false;
	selector.pos.x = undefined;
	selector.pos.y = undefined;

	canvas.removeEventListener('mousemove', select);
});
function gameLoop() {
	requestAnimationFrame(gameLoop);
	ctx.clearRect(0, 0, width, height);

	player.forEach((unit) => {
		if (
			unit.pos.x + unit.width >= unit.lastPos.x &&
			unit.pos.x <= unit.lastPos.x + 50 &&
			unit.pos.y + unit.height >= unit.lastPos.y &&
			unit.pos.y <= unit.lastPos.y + 50
		) {
			unit.x = 0;
			unit.y = 0;
		}
		unit.update();
		if (
			unit.pos.x + unit.width >= selector.pos.x &&
			unit.pos.x <= selector.pos.x + selector.width &&
			unit.pos.y + unit.height >= selector.pos.y &&
			unit.pos.y <= selector.pos.y + selector.height
		) {
			unit.selected = true;
		} else {
			unit.select = false;
		}
		ctx.beginPath();
		ctx.moveTo(unit.lastPos.x, unit.lastPos.y);
		ctx.lineTo(unit.pos.x, unit.pos.y);
		ctx.strokeStyle = 'black';
		ctx.stroke();
	});
	enemies.forEach((unit) => {
		unit.update();
	});
	selector.draw();
	ally.draw();
	enemy.draw();
}
window.addEventListener('keydown', (e) => {
	if (e.key === 'q') {
		player.forEach((unit) => {
			unit.selected = false;
		});
	}
	if (e.key === 'a') {
		player.forEach((unit) => {
			unit.selected = true;
		});
	}
	if (e.key === 'd') {
		player.forEach((unit) => {
			unit.moving = false;
		});
	}
	if (e.key === 'e') {
		player.forEach((unit) => {
			if (unit.selected) {
				unit.moving = false;
				unit.selected = false;
			}
		});
	}
});
gameLoop();
