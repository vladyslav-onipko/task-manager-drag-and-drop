import { genereteID, setToLocalStorage, getFormatedDate, getCurrentDate } from '../utils/utils.js';

import Task from "./task.js";
import Form from './form.js';

export default class TaskList {
    tasks = [];

    constructor(type) {
        this.type = type;

        this.options = {
            DOMElements: {
                section: document.querySelector(`#${this.type}`),
                tasksList: document.querySelector('.task__list'),
            },

            classList: {
                tasksListClass: 'task__list',
                taskItemClass: 'task__item',
                moveTaskBtnClass: 'js-move',
                droppableClass: 'is-droppable',
            }
        }

        this.form = new Form('js-add-form');
        this.listEl = this.options.DOMElements.section.querySelector(`.${this.options.classList.tasksListClass}`);

        this.init();
    }

    init() {
        const addBtn = this.form.submitBtn;
        
        addBtn.addEventListener('click', this.newTaskHandler.bind(this, 'active'));

        // connect drag-and-drop effect to the list
        this.listEl.addEventListener('dragenter', this._dragEnterHandler.bind(this));
        this.listEl.addEventListener('dragover', this._dragOverHandler.bind(this));
        this.listEl.addEventListener('dragleave', this._dragLeaveHandler.bind(this));
        this.listEl.addEventListener('drop', this._dropHandler.bind(this));
    }

    // updating task list logic
    renderTasks() {
        this.listEl.innerHTML = ''; // clear list befor start rendering new tasks

        if(this.tasks.length) {
            this.tasks.forEach(task => {
                task.create(
                    this.listEl,
                    {
                        tasksArr: this.tasks,
                        callback: 
                        {
                            removeTask: this.removeTask.bind(this),
                            moveTask: this.moveTask.bind(this),
                        }
                    });
            });
        } else {
            Task.createEmpty(this.listEl);
        }
        // console.log(this.tasks);
    }

    // add new task logic for active list only
    newTaskHandler(type) {
        if(this.type === type) {
            const currDate = getCurrentDate(); // get current date string in year-month-day format
            const formatedDate = getFormatedDate(currDate); // get date text format
            const taskID = genereteID(5); // create unic id for new task
            const data = this.form.getData(); // getting data from add form fields

            const taskData = {
                id: taskID,
                type: type,
                title: data.title,
                description: data.description,
                deadline: data.deadline,
                formatedDate: formatedDate,
                createdDate: currDate,
            }

            const task = new Task(taskData);

            // set data to local storage
            setToLocalStorage(
                taskData.id, 
                {
                    type: taskData.type, 
                    title: taskData.title, 
                    description: taskData.description,
                    deadline: data.deadline,
                    formatedDate: taskData.formatedDate,
                    createdDate: taskData.createdDate,
                });
            
            this.tasks.push(task);
            this.renderTasks();
            this.form.update(); // clear form fields after adding task
            this.form.showSuccessMessage('added');
        }
    }

    // remove task logic
    removeTask(id, deep = true, render = true) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
    
        this.tasks.splice(taskIndex, 1);

        if(deep) {
            localStorage.removeItem(id);
        }

        if(render) {
            this.renderTasks();
        }
    }


    // add task to the opposite list
    switchTask(task, render = true) {
        task.type = this.type // replace task type to current list type

        this.tasks.push(task);

        if(render) {
            this.renderTasks();
        }
    }

    // move task to the opposite list logic
    moveTask(id) {
        const moveTask = this.tasks.find(task => task.id === id);

        this.removeTask(moveTask.id, false);
        this.moveHandler(moveTask);

        setToLocalStorage(
            moveTask.id, 
            {
                type: moveTask.type, 
                title: moveTask.title, 
                description: moveTask.description,
                deadline: moveTask.deadline,
                formatedDate: moveTask.formatedDate, 
                createdDate: moveTask.createdDate
            });
    }

    _dragEnterHandler(e) {
        if(e.dataTransfer.types[0] === 'text/plain') {
            e.preventDefault();
        }

        this.listEl.parentElement.classList.add(this.options.classList.droppableClass);
    }

    _dragOverHandler(e) {
        if(e.dataTransfer.types[0] === 'text/plain') {
            e.preventDefault();
        }
    }

    _dragLeaveHandler(e) {
        if(e.relatedTarget && e.relatedTarget.closest(`.${this.options.classList.tasksListClass}`) !== this.listEl) {
            this.listEl.parentElement.classList.remove(this.options.classList.droppableClass);
        }
    }

    _dropHandler(e) {
        const taskID = e.dataTransfer.getData('text/plain');
        const currTask = this.tasks.find(task => task.id === taskID);
        const moveTaskBtn = document.getElementById(taskID).querySelector(`.${this.options.classList.moveTaskBtnClass}`);

        if(!currTask && moveTaskBtn) {
            moveTaskBtn.click();
            this.listEl.parentElement.classList.remove(this.options.classList.droppableClass);
        }

        this.listEl.parentElement.classList.remove(this.options.classList.droppableClass);
    }

    initMoveTaskHandler(callback) {
        this.moveHandler = callback;
    }
};