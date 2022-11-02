export const genereteID = len => {
    const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let id = '';

    for(let i = 0; i <= len; i++) {
        const randomNumber = Math.floor(Math.random() * (symbols.length - 1 + 1) + 1);

        id += symbols[randomNumber];
    }
    
    return id;
};

 export const setToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key));
};

export const clearEvents = el => {
    const clone = el.cloneNode(true);

    el.replaceWith(clone);

    return clone;
};

export const getCurrentDate = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    return `${day}/${month}/${year}`;
};

export const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60* 24));
};

export const getFormatedDate = (date) => {
    const currDate = getCurrentDate();
    const date1 = new Date(currDate);
    const date2 = new Date(date);

    const daysPassed = calcDaysPassed(date1, date2);

    if(daysPassed === 0) {
        return 'today';

    } else if(daysPassed === 1) {
        return 'yesterday';

    } else if(daysPassed > 2) {
        return `${daysPassed} days ago`;
    }

    return daysPassed;
}