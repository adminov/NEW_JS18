'use strict';

document.addEventListener('DOMContentLoaded', () => {

	const  addBtn = document.querySelector('#add'),
		headerInput = document.querySelector('.header-input'),
		todoList = document.querySelector('.todo-list'),
		todoCompleted = document.querySelector('.todo-completed');

	let todoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : {

	};

	const renderCallback = () => {
		todoList.textContent = '';
		todoCompleted.textContent = '';

		todoData.forEach( function(item){
			const li = document.createElement('li');
			li.classList.add('todo-item');
			li.innerHTML= '<span class="text-todo">' + item.value + '</span>' +
				'<div class="todo-buttons">' +
				'<button class="todo-remove"></button>' +
				'<button class="todo-complete"></button>' +
				'</div>';

			if (item.completed){
				todoCompleted.append(li);
			} else {
				todoList.append(li);
			}

			const btnTodoComplete = li.querySelector('.todo-complete');

			btnTodoComplete.addEventListener('click', () =>{
				item.completed = !item.completed;
				renderCallback();
			});

		});

		const btnTodoRemove = document.querySelectorAll('.todo-remove');
		btnTodoRemove.forEach(e => {
			const elem = e.parentNode;
			const li = elem.parentNode;
			console.log(li);
			const delItem = elem.childNodes[0];
			console.log(delItem);
			const str = elem.parentNode.parentNode.className.split(' ')[1];
			delItem.addEventListener('click', function () {
				if (str === 'todo-list'){
					li.remove();
				} else {
					li.remove();
				}
			});
		});

	};

	addBtn.addEventListener('submit', (event) => {
		event.preventDefault();

		const newTodo = {
			value: headerInput.value,
			completed: false
		};

		todoData.push(newTodo);

		renderCallback();
	});
	renderCallback();
});