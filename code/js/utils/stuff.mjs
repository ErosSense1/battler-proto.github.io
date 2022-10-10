const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = (canvas.width = innerWidth);
const height = (canvas.height = innerHeight);

const spawn_unit = document.getElementById('unitSpawn')

export { ctx, width, height, canvas,spawn_unit };
