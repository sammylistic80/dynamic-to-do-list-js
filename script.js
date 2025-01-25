document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Populating task list with tasks from Local Storage
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // 'false' means don't save again to Local Storage
        });
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Check if the task is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (task)
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText; // Set the task text

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Attach the remove event to the remove button
        removeButton.addEventListener('click', function() {
            // Remove the task from the list
            taskList.removeChild(taskItem);
            // Remove the task from Local Storage
            removeTaskFromLocalStorage(taskText);
        });

        // Append the remove button to the task item
        taskItem.appendChild(removeButton);

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Save the task to Local Storage if save is true
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Function to save task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Attach event listener for the 'Add Task' button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Attach event listener for pressing "Enter" to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });
});
