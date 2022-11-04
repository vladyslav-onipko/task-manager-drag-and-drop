(()=>{"use strict";const t=(t,s)=>{localStorage.setItem(t,JSON.stringify(s))},s=()=>{var t=new Date,s=t.getDate(),e=t.getMonth()+1;return t.getFullYear()+`-${e}-`+s},e=(t,s,e=!0)=>e?Math.round(Math.abs(t-s)/864e5):Math.round((t-s)/864e5),i=t=>{var i=s();return i=new Date(i),t=new Date(t),0===(i=e(i,t))?"today":1===i?"yesterday":2<i?i+" days ago":void 0};class a{constructor(t="",s={}){this.formClass=t,this.options=s,this.options={DOMElements:{form:document.querySelector("."+this.formClass)},classList:{inputClass:"form__input",submitBtn:"form__submit",invalidInputClass:"is-not-valid",validationInputClass:"js-validation"}},this.form=this.options.DOMElements.form,this.formInputs=[...this.form.querySelectorAll("."+this.options.classList.inputClass)],this.formValidationInputs=[...this.form.querySelectorAll("."+this.options.classList.validationInputClass)],this.formValidation(),this._init()}submitBtn=null;_init(){this.form.addEventListener("input",this.formValidation.bind(this))}formValidation(){this.submitBtn=this.form.querySelector("."+this.options.classList.submitBtn),this.formValidationInputs.length&&(this.formValidationInputs.every((t=>0<t.value.trim().length))?this.submitBtn.removeAttribute("disabled"):this.submitBtn.setAttribute("disabled","disabled"))}update(){this.formInputs.length&&this.formInputs.forEach((t=>t.value="")),this.submitBtn.setAttribute("disabled","disabled")}setData(t){const s=Object.keys(t);this.formInputs.length&&this.formInputs.forEach((e=>{var i;s.includes(e.id)&&(i=s.find((t=>t===e.id)),e.id===i?e.value=t[i]:e.value="")}))}getData(){const t={};return this.formInputs.length&&this.formInputs.forEach((s=>{var e=s.id;s=s.value,t[e]=s})),t}showSuccessMessage(t){var s=document.querySelector(".main");const e=document.createElement("div");e.innerHTML="Task successfully "+t,e.className="success-box",s.append(e),setTimeout((()=>{e.remove()}),1200)}}class n{constructor(t){this.id=t.id,this.type=t.type,this.title=t.title,this.description=t.description,this.deadline=t.deadline,this.formatedDate=t.formatedDate,this.createdDate=t.createdDate,this.options={DOMElements:{},classList:{moveTaskBtnClass:"js-move",removeTaskBtnClass:"js-remove",editTaskBtnClass:"js-edit",confirmEditTaskBtnClass:"js-edit-task",taskElTitleClass:"task__item-title",taskElDescriptinClass:"task__item-description"}},this.form=new a("js-edit-form"),this.daysLeft=this._calcDeadline()}taskEl=null;_init(t,s={}){this.taskEl=document.getElementById(this.id);var e=this.taskEl.querySelector("."+this.options.classList.removeTaskBtnClass),i=this.taskEl.querySelector("."+this.options.classList.moveTaskBtnClass),a=this.taskEl.querySelector("."+this.options.classList.editTaskBtnClass);e.addEventListener("click",s.removeTask.bind(null,this.id)),i.addEventListener("click",s.moveTask.bind(null,this.id)),a.addEventListener("click",this.editHandler.bind(this,t)),this.taskEl.addEventListener("dragstart",this.dragHandler.bind(this))}editHandler(t){var s,e,i={title:this.title,description:this.description},a=this.form.submitBtn;e=(s=a).cloneNode(!0),s.replaceWith(e),(a=e).hasAttribute("disabled")||a.setAttribute("disabled","disabled"),this.form.setData(i),a.addEventListener("click",this.confirmEditHandler.bind(this,t))}confirmEditHandler(s){var e=this.taskEl.querySelector("."+this.options.classList.taskElTitleClass),i=this.taskEl.querySelector("."+this.options.classList.taskElDescriptinClass),a=(s=s.find((t=>t.id===this.id)),this.form.getData());s.title=e.textContent=a.title,s.description=i.textContent=a.description,t(s.id,{type:s.type,title:s.title,description:s.description,deadline:s.deadline,formatedDate:s.formatedDate,createdDate:s.createdDate}),this.form.showSuccessMessage("updated"),this.form.submitBtn.setAttribute("disabled","disabled")}dragHandler(t){t.dataTransfer.setData("text/plain",this.id),t.dataTransfer.effectAllowed="move"}_calcDeadline(){if(this.deadline&&0<this.deadline){var t=new Date(this.createdDate).getDate(),s=(t=+this.deadline+t,(a=new Date).getDate()),i=a.getMonth(),a=a.getFullYear();t=new Date(a,i,t),a=new Date(a,i,s);let n=e(t,a,!1);return n=n<=0?"lost all":n}}create(t,s={}){var e=`\n            <li class="task__item ${+this.daysLeft<=3&&"active"===this.type?"is-warning":""}" id="${this.id}" draggable="true">\n                <span class="task__icon fas fa-times js-remove"></span>\n                <div class="task__info">\n                    <p class="task__date">Posted: ${this.formatedDate}</p>\n                    <span class="task__separator" ${this.daysLeft&&"active"===this.type?"style=display:block":"style=display:none"}>/</span>\n                    <p class="task__deadline" \n                        ${this.daysLeft&&"active"===this.type?"style=display:block":"style=display:none"}>\n                        ${this.daysLeft} ${1==+this.daysLeft?"day":"days"}\n                    </p>\n                </div>\n                <h4 class="task__item-title">${this.title}</h4>\n                <p class="task__item-description">${this.description}</p>\n                <div class="task__actions">\n                    <a class="btn is-secondary js-edit js-open-popup" href="#popup-edit">Edit</a>\n                    <button class="btn is-primary js-move"type="button">${"active"===this.type?"Finish":"Activate"}</button>\n                </div>\n            </li>\n        `;t.insertAdjacentHTML("beforeend",e),this._init(s.tasksArr,s.callback)}static createEmpty(t,s="no tasks added yet"){t.insertAdjacentHTML("beforeend",`\n            <li class="task__item is-empty">\n                <p class="task__item-description">${s}</p>\n            </li>\n        `)}}class l{tasks=[];constructor(t){this.type=t,this.options={DOMElements:{section:document.querySelector("#"+this.type),tasksList:document.querySelector(".task__list")},classList:{tasksListClass:"task__list",taskItemClass:"task__item",moveTaskBtnClass:"js-move",droppableClass:"is-droppable"}},this.form=new a("js-add-form"),this.listEl=this.options.DOMElements.section.querySelector("."+this.options.classList.tasksListClass),this.init()}init(){this.form.submitBtn.addEventListener("click",this.newTaskHandler.bind(this,"active")),this.listEl.addEventListener("dragenter",this._dragEnterHandler.bind(this)),this.listEl.addEventListener("dragover",this._dragOverHandler.bind(this)),this.listEl.addEventListener("dragleave",this._dragLeaveHandler.bind(this)),this.listEl.addEventListener("drop",this._dropHandler.bind(this))}renderTasks(){this.listEl.innerHTML="",this.tasks.length?this.tasks.forEach((t=>{t.create(this.listEl,{tasksArr:this.tasks,callback:{removeTask:this.removeTask.bind(this),moveTask:this.moveTask.bind(this)}})})):n.createEmpty(this.listEl)}newTaskHandler(e){var a,l;this.type===e&&(l=s(),a=i(l),a={id:(t=>{var s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let e="";for(let t=0;t<=5;t++)e+=s[Math.floor(Math.random()*(s.length-1+1)+1)];return e})(),type:e,title:(e=this.form.getData()).title,description:e.description,deadline:e.deadline,formatedDate:a,createdDate:l},l=new n(a),t(a.id,{type:a.type,title:a.title,description:a.description,deadline:e.deadline,formatedDate:a.formatedDate,createdDate:a.createdDate}),this.tasks.push(l),this.renderTasks(),this.form.update(),this.form.showSuccessMessage("added"))}removeTask(t,s=!0,e=!0){var i=this.tasks.findIndex((s=>s.id===t));this.tasks.splice(i,1),s&&localStorage.removeItem(t),e&&this.renderTasks()}switchTask(t,s=!0){t.type=this.type,this.tasks.push(t),s&&this.renderTasks()}moveTask(s){var e=this.tasks.find((t=>t.id===s));this.removeTask(e.id,!1),this.moveHandler(e),t(e.id,{type:e.type,title:e.title,description:e.description,deadline:e.deadline,formatedDate:e.formatedDate,createdDate:e.createdDate})}_dragEnterHandler(t){"text/plain"===t.dataTransfer.types[0]&&t.preventDefault(),this.listEl.parentElement.classList.add(this.options.classList.droppableClass)}_dragOverHandler(t){"text/plain"===t.dataTransfer.types[0]&&t.preventDefault()}_dragLeaveHandler(t){t.relatedTarget&&t.relatedTarget.closest("."+this.options.classList.tasksListClass)!==this.listEl&&this.listEl.parentElement.classList.remove(this.options.classList.droppableClass)}_dropHandler(t){const s=t.dataTransfer.getData("text/plain");t=this.tasks.find((t=>t.id===s));var e=document.getElementById(s).querySelector("."+this.options.classList.moveTaskBtnClass);!t&&e&&(e.click(),this.listEl.parentElement.classList.remove(this.options.classList.droppableClass)),this.listEl.parentElement.classList.remove(this.options.classList.droppableClass)}initMoveTaskHandler(t){this.moveHandler=t}}class r{constructor(){this.options={DOMElements:{siteMain:document.querySelector(".main"),backdrop:document.querySelector(".backdrop"),popupArr:document.querySelectorAll(".popup")},classList:{backdropVisibilityClass:"is-visible",popupVisibilityClass:"is-open",openPopupBtnClass:"js-open-popup",closePopupBtnClass:"js-close-popup"}},this._init()}currPopup=null;closeButton=null;_init(){var t=this.options.DOMElements.siteMain,s=this.options.DOMElements.backdrop;t?.addEventListener("click",this._popupOpenHandler.bind(this)),s?.addEventListener("click",this.close.bind(this)),document.addEventListener("keydown",this._keyCloseHandler.bind(this))}show(t){t.preventDefault();var s=this.options.DOMElements.backdrop;(t=t.target.classList.contains(this.options.classList.openPopupBtnClass)?t.target:null)&&(t=t.getAttribute("href"),this.currPopup=document.querySelector(t),this.currPopup)&&(this.closeButton=this.currPopup.querySelector("."+this.options.classList.closePopupBtnClass),s?.classList.add(this.options.classList.backdropVisibilityClass),this.currPopup.classList.add(this.options.classList.popupVisibilityClass),this._closeButtonHandler(this.closeButton,s))}close(){var t=this.options.DOMElements.backdrop;this.currPopup&&(t?.classList.remove(this.options.classList.backdropVisibilityClass),this.currPopup.classList.remove(this.options.classList.popupVisibilityClass),this.closeButton.removeEventListener("click",this._closeButtonHandler.bind(this)))}_closeButtonHandler(t,s){t?.addEventListener("click",(()=>{s?.classList.remove(this.options.classList.backdropVisibilityClass),this.currPopup.classList.remove(this.options.classList.popupVisibilityClass)}))}_keyCloseHandler(t){27===t.keyCode&&this.close()}_popupOpenHandler(t){this.show(t)}}(class{static init(){new r;const t=new l("active"),s=new l("finished");t.initMoveTaskHandler(s.switchTask.bind(s)),s.initMoveTaskHandler(t.switchTask.bind(t));var e=Object.keys(localStorage);e.length&&e.forEach((e=>{var a=JSON.parse(localStorage.getItem(e)),l=i(a.createdDate);(a.id=e,a.formatedDate=l,e=new n(a)).type===t.type&&(t.tasks.push(e),t.renderTasks()),e.type===s.type&&(s.tasks.push(e),s.renderTasks())}))}}).init()})();