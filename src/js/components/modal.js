export default class ModalMenedger {
    constructor() {
        this.options = {
            DOMElements: {
                siteMain: document.querySelector('.main'),
                backdrop: document.querySelector('.backdrop'),
                popupArr: document.querySelectorAll('.popup'),
            },

            classList: {
                backdropVisibilityClass: 'is-visible',
                popupVisibilityClass: 'is-open',
                openPopupBtnClass: 'js-open-popup',
                closePopupBtnClass: 'js-close-popup',
            }
        }
        
        this._initEvents();
    }

    currPopup = null;
    closeButton = null;
    
    _initEvents() {
        const siteMain = this.options.DOMElements.siteMain;
        const backdrop = this.options.DOMElements.backdrop;

        siteMain?.addEventListener('click', this._popupOpenHandler.bind(this));
        backdrop?.addEventListener('click', this.close.bind(this));
        document.addEventListener('keydown', this._keyCloseHandler.bind(this));
    }

    show(e) {
        e.preventDefault();
        
        const backdrop = this.options.DOMElements.backdrop;
        const target = e.target.classList.contains(this.options.classList.openPopupBtnClass) ? e.target : null;
        
        if(!target) return;

        const targetID = target.getAttribute('href');
        this.currPopup = document.querySelector(targetID);
        
        if(this.currPopup) {
            this.closeButton = this.currPopup.querySelector(`.${this.options.classList.closePopupBtnClass}`);
           
            backdrop?.classList.add(this.options.classList.backdropVisibilityClass);
            this.currPopup.classList.add(this.options.classList.popupVisibilityClass);

            this._closeButtonHandler(this.closeButton, backdrop);
        }
    }

    close() {
        const backdrop = this.options.DOMElements.backdrop;
      
        if(this.currPopup) {
            backdrop?.classList.remove(this.options.classList.backdropVisibilityClass);
            this.currPopup.classList.remove(this.options.classList.popupVisibilityClass);

            this.closeButton.removeEventListener('click', this._closeButtonHandler.bind(this));
        }
    }

    _closeButtonHandler(btn, overlay) {
        btn?.addEventListener('click', () => {
            overlay?.classList.remove(this.options.classList.backdropVisibilityClass);
            this.currPopup.classList.remove(this.options.classList.popupVisibilityClass);
        });
    }

    _keyCloseHandler(e) {
        if(e.keyCode === 27) {
            this.close();
        }
    }

    _popupOpenHandler(e) {
        this.show(e);
    }
}