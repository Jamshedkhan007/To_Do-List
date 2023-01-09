const tasklist = document.getElementById('list');
const addbutton = document.getElementById('btn');
const taskinput = document.getElementById('input');
const alltask = document.getElementById('all');
const completetask = document.getElementById('completed');
const incompletetask = document.getElementById('incomplete');
const allcomplete = document.getElementById('completeall');
const deleteall = document.getElementById('deleteall');

// In this we count the tasks
let all = 0;
let complete = 0;
updatecount();

// Add the eventlistner buttons
addbutton.addEventListener('click', addtask);
tasklist.addEventListener('click', deletetask);
alltask.addEventListener('click', filteralltask);
completetask.addEventListener('click', filtercomplete);
incompletetask.addEventListener('click', filterincomplete);
allcomplete.addEventListener('click', markall);
deleteall.addEventListener('click', Destroyall);

// Adding the Tasks in List
function addtask(e) {
    e.preventDefault();
    if (taskinput.value === '') {
        alert('Enter a Task First');
    }
    else {
        const newtodo = document.createElement('li');
        newtodo.classList.add('todo');

        // this is circle button to for complete task
        const completebutton = document.createElement('button');
        completebutton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completebutton.classList.add('check');
        newtodo.appendChild(completebutton);

        //that get the input froms user
        const tasktext = document.createElement('span');
        tasktext.innerHTML = taskinput.value;
        newtodo.appendChild(tasktext);

        // this is Delete task button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash');
        newtodo.appendChild(trashButton);
        tasklist.appendChild(newtodo);
        taskinput.value = '';
        all++;
        updatecount();
    };
};

// Delete funtion for deleting task from list
function deletetask(e) {
    const item = e.target;
    if (item.classList[0] === 'trash') {
        const task = item.parentElement;
        if (task.classList.contains('completed')) {
            complete--;
        }
        all--;
        task.classList.add('fade');
        task.remove();
        updatecount();
    };
    // if the task is checked it goes to complete list
    if (item.classList[0] === 'check') {
        const task = item.parentElement;
        if (task.classList.contains('completed')) {
            return;
        }
        task.classList.add('completed');
        complete++;
        updatecount();
    }
};

// filter all Tasks In task list
function filteralltask() {
    const todos = tasklist.childNodes;

    todos.forEach(function (todo) {
        if (todo.style) {
            todo.style.display = 'flex';
        };
    });
}

// filter only Complete Task in task list
function filtercomplete() {
    const todos = tasklist.childNodes;

    todos.forEach(function (todo) {
        if (todo.style) {
            if (todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            }
            else {
                todo.style.display = 'none';
            }
        }
    });
}
// filter only Incomplete Task in task list
function filterincomplete() {
    const todos = tasklist.childNodes;

    todos.forEach(function (todo) {
        if (todo.style) {
            if (!todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
        }
    });
}

// function for AllCompleteTask in Task List
function markall() {
    const todos = tasklist.childNodes;

    todos.forEach(function (todo) {
        todo.classList.add('completed');
    });
    complete = all;
    updatecount();
}

// function for Deletealltask in Task List
function Destroyall() {

    const todos = tasklist.querySelectorAll('.completed');

    todos.forEach(function (todo) {
        if (todo.classList.contains('completed')) {
            complete--;
            all--;
            todo.remove();
        }
    });
    updatecount();
}

// Update Count function
function updatecount() {
    document.getElementById('allcount').innerText = all;
    document.getElementById('complete').innerText = complete;
    document.getElementById('incompletecount').innerText = all-complete;

}
