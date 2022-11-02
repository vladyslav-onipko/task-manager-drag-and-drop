import { getFromLocalStorage, getFormatedDate } from './utils/utils.js';

import TaskList from './components/task-list.js';
import Task from './components/task.js';
import ModalMenedger from './components/modal.js';

class App {
    static init() {
        const modal = new ModalMenedger();
        const activeTasksList = new TaskList('active');
        const finishedTasksList = new TaskList('finished');

        // binding methods to the exact instance were clicked
        activeTasksList.initMoveTaskHandler(finishedTasksList.switchTask.bind(finishedTasksList));
        finishedTasksList.initMoveTaskHandler(activeTasksList.switchTask.bind(activeTasksList));


        // parsing and rendering tasks from local storage depending on list type
        const keys = Object.keys(localStorage);

        if(keys.length) {
            keys.forEach(key => {
                const data = getFromLocalStorage(key);
                const newFormatedDate = getFormatedDate(data.createdDate); // get date text format
                
                data.id = key;
                data.formatedDate = newFormatedDate;
                
                const task = new Task(data);
                
                if(task.type === activeTasksList.type) {
                    activeTasksList.tasks.push(task);
                    activeTasksList.renderTasks();
                }

                if(task.type === finishedTasksList.type) {
                    finishedTasksList.tasks.push(task);
                    finishedTasksList.renderTasks();
                }
            });
        }
    }
}

App.init();