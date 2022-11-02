export default class Form {
    constructor(formClass = '', options = {}) {
        this.formClass = formClass;
        this.options = options;
    
        this.options = {
            DOMElements: {
                form: document.querySelector(`.${this.formClass}`),
            },

            classList: {
                inputClass: 'form__input',
                submitBtn: 'form__submit',
                invalidInputClass: 'is-not-valid',
                validationInputClass: 'js-validation',
            }
        }

        this.form = this.options.DOMElements.form;

        this.formInputs = [...this.form.querySelectorAll(`.${this.options.classList.inputClass}`)];
        this.formValidationInputs = [...this.form.querySelectorAll(`.${this.options.classList.validationInputClass}`)];

        this.formValidation();
        this._init();
    }

    submitBtn = null;

    _init() {
        this.form.addEventListener('input', this.formValidation.bind(this));
    }

    formValidation() {
        this.submitBtn = this.form.querySelector(`.${this.options.classList.submitBtn}`);

        if(this.formValidationInputs.length) {
            const isValid = this.formValidationInputs.every(input => input.value.trim().length > 0);
            
            isValid ? this.submitBtn.removeAttribute('disabled') : this.submitBtn.setAttribute('disabled', 'disabled');
        }
    }

    update() {
        if(this.formInputs.length) {
            this.formInputs.forEach(input => input.value = '');
        }

        this.submitBtn.setAttribute('disabled', 'disabled');
    }

    setData(data) {
        const keys = Object.keys(data);

        if(this.formInputs.length) {
            this.formInputs.forEach(el => {
                if(keys.includes(el.id)) {
                    const key = keys.find(k => k === el.id);

                    el.id === key ? el.value = data[key] : el.value = '';
                }
            });
        }
    }

    getData() {
        const data = {};

        if(this.formInputs.length) {
            this.formInputs.forEach(el => {
                const propName = el.id;
                const value = el.value;
    
                data[propName] = value;
            });
        }

        return data;
    }

    showSuccessMessage(text) {
        const siteMain = document.querySelector('.main');
        const box = document.createElement('div');
        const content = `Task successfully ${text}`;

        box.innerHTML = content;
        box.className = 'success-box';
        siteMain.append(box);

        setTimeout(() => {
            box.remove();
        }, 1200);
    }
};
