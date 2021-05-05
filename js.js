'use strict';

let color = document.getElementById('color'),
	change = document.getElementById('change'),
	body = document.body;

const randomColor = () => {
	let c = '#';
	for (let i = 0; i < 6; i++) {
		c += (Math.random() * 16 | 0).toString(16);
	}
	return c;
};

const changeBody = () => {
	color.textContent = randomColor();
	body.style.backgroundColor = randomColor();
};

change.addEventListener('click', changeBody);