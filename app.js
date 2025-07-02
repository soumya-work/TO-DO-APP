document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateStats();

    }
    //This function loads the data form the local storage and displays the data in frontend  and calls the function like updateTaskList and updateStats...
})


let tasks = []; //This creats an empty array for the tasks

let currentFilter = 'all'; //This sets the current filter to all

//This is an array for the tasks to be stored in todo list

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
} //saves the array in local storage so call it each time when you do any changes

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();


    if (text) {
        tasks.push({
            text: text,
            completed: false,
        });
        taskInput.value = "";
        updateTasksList(); // Calls the Update TasksList Function
        updateStats(); // 
        saveTasks();

        //If the inpout is text than only push it into the array

    } else {
        alert("Error : Please enter a valid Text");
    } // Else display a message 
};

// The above is a arrow function which is taking the input from the user and pushing the value into the array.

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();

}; //Change the task of that index to completed when any achange is made if it is !completed , viceversa

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
    //This function is called when we click on the delete icon which passes that particular element's index value and then we can use splice method which deletes the number of specified elements from that given index value.
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
    //This function is called when we click on the edit icon which passes that perticular element's index value in the arry and than we can edit it as it put that value into the taskInput bar
};



const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length //total length of the sub array with the completed tasks.
    const totalTasks = tasks.length //total length of the main array
    const progress = (completeTasks / totalTasks) * 100; // converts the progress into percentage
    const progressBar = document.getElementById("progress") //get the progressbar from html
    progressBar.style.width = `${progress}% ` //put the width of the progressbar in the html

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}` //get the numbers elements from the html and put the values i.e length of the arrays.

    if (tasks.length && completeTasks === totalTasks) {
        blastConfetti();
    }
    //If the two array for the total task and completed task are eaual then call he blastConfetti function so that we can see the Celebration
}

const updateTasksList = (searchText = "") => {
    const taskList = document.getElementById('task-list')
    taskList.innerHTML = '';

    tasks
        .filter(task => {
            if (currentFilter === "completed") return task.completed;
            if (currentFilter === "active") return !task.completed;
            return true;
        })
        .filter(task => {
            return task.text.toLowerCase().includes(searchText.toLowerCase());
        })

        .forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <div class="taskItem">
                <div class = "task ${task.completed ? "completed" : ""}"> 
                    <input type ="checkbox" class = "checkbox" ${task.completed ? "checked" : ""} />
                        <p> ${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onClick="editTask(${index})" />
                    <img src="./img/bin.png"onClick="deleteTask(${index})"/>
                </div>
            </div>
        `;
            listItem.addEventListener('change', () => toggleTaskComplete(index)); //here the toggleTaskComplete function is called whenever any change is made to the listItem
            taskList.appendChild(listItem);
        });
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault(); //prevents the default behaviour of the form
    addTask(); // calls the add task function
});

document.getElementById('filterSelect').addEventListener('change', (e) => {
    currentFilter = e.target.value;
    updateTasksList();
});



document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase(); // user ka search text
    updateTasksList(query); // search query ke saath update
});


const blastConfetti = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}