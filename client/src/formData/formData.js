export const changeDate = (date) => {
    let today = new Date(date);
    let day = today.getDate();
    if (day > 0 && day < 10) {
        day = `0${day}`;
    };
    let month = today.getMonth() + 1;
    if (month > 0 && month < 10) {
        month = `0${month}`;
    };
    let year = today.getFullYear();
    return `${day}-${month}-${year}`;
};
export const changeDate1 = (date) => {
    let today = new Date(date);
    let day = today.getDate();
    if (day > 0 && day < 10) {
        day = `0${day}`;
    };
    let month = today.getMonth() + 1;
    if (month > 0 && month < 10) {
        month = `0${month}`;
    };
    let year = today.getFullYear();
    return `${year}-${month}-${day}`;
};

export const changeNumber = function (number) {
    let numberNew = new Intl.NumberFormat('de-DE').format(number)
    return numberNew
}

export const calculate = function (a, b) {
    let c = a - (a * b);
    return c
}



