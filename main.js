'use strict'


class taskList{
    constructor(){
        const _tasks = [];
        
        this.addTask = function(task){
            if(task){
                if(_tasks.filter((taskOfArray) => taskOfArray == task).length == 0){
                    return _tasks.push(task);
                } 
                alert ("Zadanie o takiej treści jest już dodane!")
            }
            else{
                alert("Podaj treść zadania!")
            }
        }

        this.getTasks = function(){
            return _tasks;
        }

        this.removeTask = function(taskIndex){
            return _tasks.splice(taskIndex, 1);
        }

        this.reloadDOM = function(whileSearching, [...tasks], [...search]){
            if(whileSearching){
                document.querySelector("div#wrapper>div.taskList").innerHTML = "";
                search.forEach((task, index) => {
                    const taskDOM = document.createElement("div");
                    const removeButtonDOM = document.createElement("button");
                    removeButtonDOM.textContent = "USUŃ";
                    taskDOM.textContent = task;
                    taskDOM.appendChild(removeButtonDOM);
                    removeButtonDOM.addEventListener("click", () => {
                        search.splice(index, 1);
                        this.removeTask(tasks.indexOf(task));
                        this.reloadDOM(false, this.getTasks(), []);
                        document.querySelector("div#wrapper>div.formulages>input.searchTask").value = "";
                    })
                    document.querySelector("div#wrapper>div.taskList").appendChild(taskDOM);
                })
            }
            else{
                document.querySelector("div#wrapper>div.taskList").innerHTML = "";
                tasks.forEach((task, index) => {
                    const taskDOM = document.createElement("div");
                    const removeButtonDOM = document.createElement("button");
                    removeButtonDOM.textContent = "USUŃ";
                    taskDOM.textContent = task;
                    taskDOM.appendChild(removeButtonDOM);
                    removeButtonDOM.addEventListener("click", () => {
                        this.removeTask(index);
                        this.reloadDOM(false, this.getTasks(), []);
                    })
                    document.querySelector("div#wrapper>div.taskList").appendChild(taskDOM);
                })
            }
        }

        this.search = function(name){
            const searchedNames = this.getTasks().filter((task) => task.toLowerCase().includes(name.toLowerCase()));
            this.reloadDOM(true, this.getTasks(), searchedNames);
        }
    }
}


class main{
    constructor(){
        const tasks = new taskList();
        tasks.search();

        const searchInput = document.querySelector("div#wrapper>div.formulages>input.searchTask");
        const addTaskFormulage = document.querySelector("div#wrapper>div.formulages>form");
        const addTaskInput = document.querySelector("div#wrapper>div.formulages>form>input");

        searchInput.addEventListener("keyup", () => {
            tasks.search(searchInput.value);
        })

        addTaskFormulage.addEventListener("submit", () => {
            event.preventDefault();
            tasks.addTask(addTaskInput.value);
            addTaskInput.value = "";
            tasks.reloadDOM(false, tasks.getTasks(), []);
        })
    }
}

const mainObject = new main();