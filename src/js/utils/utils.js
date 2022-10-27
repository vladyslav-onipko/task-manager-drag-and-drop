const genereteID = len => {
    const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let id = '';

    for(let i = 0; i <= len; i++) {
        const randomNumber = Math.floor(Math.random() * (symbols.length - 1 + 1) + 1);

        id += symbols[randomNumber];
    }
    
    return id;
};

const setToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key));
};

const clearEvents = el => {
    const clone = el.cloneNode(true);

    el.replaceWith(clone);

    return clone;
};

export { genereteID, setToLocalStorage, getFromLocalStorage, clearEvents };