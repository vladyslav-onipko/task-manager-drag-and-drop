import { clearEvents, setToLocalStorage, calcDateDifference } from '../utils/utils.js'

import Form from './form.js';

export default class Task {
    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.title = data.title;
        this.description = data.description;
        this.deadline = data.deadline;
        this.formatedDate = data.formatedDate;
        this.createdDate = data.createdDate;

        this.options = {
            DOMElements: {},

            classList: {
                moveTaskBtnClass: 'js-move',
                removeTaskBtnClass: 'js-remove',
                editTaskBtnClass: 'js-edit',
                confirmEditTaskBtnClass: 'js-edit-task',
                taskElTitleClass: 'task__item-title',
                taskElDescriptinClass: 'task__item-description',
            }
        }

        this.form = new Form('js-edit-form');

        this.daysLeft = this._calcDeadline();

        console.log(this.daysLeft);
    }

    taskEl = null;

    _init(tasks, handler = {}) {
        this.taskEl = document.getElementById(this.id);

        const removeBtn = this.taskEl.querySelector(`.${this.options.classList.removeTaskBtnClass}`);
        const moveBtn = this.taskEl.querySelector(`.${this.options.classList.moveTaskBtnClass}`);
        const editBtn = this.taskEl.querySelector(`.${this.options.classList.editTaskBtnClass}`);
        
        removeBtn.addEventListener('click', handler.removeTask.bind(null, this.id));
        moveBtn.addEventListener('click', handler.moveTask.bind(null, this.id));
        editBtn.addEventListener('click', this.editHandler.bind(this, tasks));
        this.taskEl.addEventListener('dragstart', this.dragHandler.bind(this));
    }

    editHandler(tasksArr) {
        const oldData = {
            title: this.title,
            description: this.description,
        };

        let confirmEditBtn = this.form.submitBtn;
        
        confirmEditBtn = clearEvents(confirmEditBtn);
        
        if(!confirmEditBtn.hasAttribute('disabled')) {
            confirmEditBtn.setAttribute('disabled', 'disabled');
        }

        this.form.setData(oldData);

        confirmEditBtn.addEventListener('click', this.confirmEditHandler.bind(this, tasksArr));
    }

    confirmEditHandler(tasksArr) {
        const taskTitleEl = this.taskEl.querySelector(`.${this.options.classList.taskElTitleClass}`);
        const taskDescriptionEl = this.taskEl.querySelector(`.${this.options.classList.taskElDescriptinClass}`);

        const currTask = tasksArr.find(task => task.id === this.id);
        const newData = this.form.getData();

        currTask.title = taskTitleEl.textContent = newData.title;
        currTask.description = taskDescriptionEl.textContent = newData.description;
        
        setToLocalStorage(
            currTask.id, 
            {
                type: currTask.type, 
                title: currTask.title, 
                description: currTask.description,
                deadline: data.deadline,
                formatedDate: currTask.formatedDate,
                createdDate: currTask.createdDate,
            });

        this.form.showSuccessMessage('updated');
        this.form.submitBtn.setAttribute('disabled', 'disabled');
    }

    dragHandler(e) {
        e.dataTransfer.setData('text/plain', this.id);
        e.dataTransfer.effectAllowed = 'move';
    }

    _calcDeadline() {
        if(this.deadline && this.deadline > 0) {
            const dayPosted = new Date(this.createdDate).getDate();
            const now = new Date();
            const monthNow = now.getMonth();
            const yearNow = now.getFullYear();

            const dayFinish = +this.deadline + dayPosted;
            const countDownDate = new Date(yearNow, monthNow, dayFinish);
            // const test = new Date(yearNow, monthNow, 5); for deadline testing

            let days = calcDateDifference(countDownDate, now, false);

            days <= 0 ? days = 'lost all' : days = days;

            return days;
        }
    }

    create(anchor, options = {}) {
        const html = `
            <li class="task__item ${+this.daysLeft <= 3 && this.type === 'active' ? 'is-warning': ''}" id="${this.id}" draggable="true">
                <span class="task__icon fas fa-times js-remove"></span>
                <div class="task__info">
                    <p class="task__date">Posted: ${this.formatedDate}</p>
                    <span class="task__separator" ${this.daysLeft && this.type === 'active' ? 'style=display:block' : 'style=display:none'}>/</span>
                    <p class="task__deadline" 
                        ${this.daysLeft && this.type === 'active' ? 'style=display:block' : 'style=display:none'}>
                        ${this.daysLeft} ${+this.daysLeft === 1 ? 'day' : 'days'}
                    </p>
                </div>
                <h4 class="task__item-title">${this.title}</h4>
                <p class="task__item-description">${this.description}</p>
                <div class="task__actions">
                    <a class="btn is-secondary js-edit js-open-popup" href="#popup-edit">Edit</a>
                    <button class="btn is-primary js-move"type="button">${this.type === 'active' ? 'Finish' : 'Activate'}</button>
                </div>
            </li>
        `;

        anchor.insertAdjacentHTML('beforeend', html);
        this._init(options.tasksArr, options.callback);
    }

    

    static createEmpty(anchor, text = 'no tasks added yet') {
        const html = `
            <li class="task__item is-empty">
                <p class="task__item-description">${text}</p>
            </li>
        `;
        
        anchor.insertAdjacentHTML('beforeend', html);
    }
};