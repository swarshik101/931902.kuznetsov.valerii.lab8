let n = 0;
let count = 0;
let object_list = [];
let t;

function element_find_func(element_index, element_field) {
	return document.body.querySelector('table').querySelector('.' + object_list[element_index].className).querySelector('.' + element_field + '_in').value
}

function replace_elements_func(i, j) {
	t = element_find_func(i, 'text');
	document.body.querySelector('table').querySelector('.' + object_list[i].className).querySelector('.text_in').value = element_find_func(j, 'text');
	document.body.querySelector('table').querySelector('.' + object_list[j].className).querySelector('.text_in').value = t;
	t = element_find_func(i, 'number');
	document.body.querySelector('table').querySelector('.' + object_list[i].className).querySelector('.number_in').value = element_find_func(j, 'number');
	document.body.querySelector('table').querySelector('.' + object_list[j].className).querySelector('.number_in').value = t;
}

function adding_row_func(row_name) {
	return `
			<tr class='${row_name}'>
				<td><input type='text' class='text_in'></td>
				<td><input type='number' class='number_in'></td>
				<td><button class='move_up_btn'>&#8593;</button></td>
				<td><button class='move_down_btn'>&#8595;</button></td>
				<td><button class='delete_btn'>х</button></td>
			</tr>
        `
}

function add_row_btn_func() {
	n += 1;
	count += 1;
	let k = 'row_' + n;
	document.body.querySelector('table').insertAdjacentHTML('beforeend', this.adding_row_func(k));
	object_list[n] = document.querySelector('.' + k)
	object_list[Number(n) + 1] = null;
}

function delete_btn_func(target_obj) {
	let i = target_obj.parentElement.parentElement.className;
	i = i.replace('row_', '');
	let j = object_list[n].className;
	j = j.replace('row_', '') - 1;
	let k = n;
	object_list.splice(i, 1);
	document.body.querySelector('table').querySelector('.' + target_obj.parentElement.parentElement.className).remove();
	for (k; k > i; k--) {
		object_list[k - 1].className = 'row' + j;
		j -= 1;
	}
	n -= 1;
}

function down_btn_func(target_obj) {
	let i = target_obj.parentElement.parentElement.className;
	i = Number(i.replace('row_', ''));
	j = Number(i) + 1;
	if (object_list[j] != null) {
		replace_elements_func(i, j);
	}
}

function up_btn_func(target_obj) {
	let i = target_obj.parentElement.parentElement.className;
	i = i.replace('row_', '');
	j = i - 1;
	if (object_list[j] != null) {
		replace_elements_func(i, j);
	}
}

function save_btn_func() {
	let text_for_save = [];
	document.body.insertAdjacentHTML('beforeend', `{`);
	for (i = 0; i <= n; i++) {
		text_for_save.text_in = element_find_func(i, 'text');
		text_for_save.number_in = element_find_func(i, 'number');
		document.body.insertAdjacentHTML('beforeend', `'${text_for_save.text_in}' : '${text_for_save.number_in}'`);
		if (i != n) document.body.insertAdjacentHTML('beforeend', ` , `);
	}
	document.body.insertAdjacentHTML('beforeend', `}`);
}

function listener() {
	object_list[0] = document.querySelector('.row_0');
	object_list[-1] = null;
	document.body.addEventListener('click', e => {
		switch (e.target.className) {
			case 'delete_btn':
				this.delete_btn_func(e.target);
				break;
			case 'move_down_btn':
				this.down_btn_func(e.target);
				break;
			case 'move_up_btn':
				this.up_btn_func(e.target);
				break;
			case 'add_row_btn':
				add_row_btn_func();
				break;
			case 'save_btn':
				save_btn_func();
				break;
		}
	})
}

document.addEventListener('DOMContentLoaded', () => listener());