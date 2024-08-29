// this could be a good starting file for a fn library 🧠

function formatJSDate(date) {
    let dt = new Date(date);
    return (
        dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear()
        // +
        // " " +
        // dt.toLocaleString("en-US", {
        //     hour: "numeric",
        //     minute: "numeric",
        //     hour12: false,
        // })
    );
}

function formatDateEU(date) {
    let dt = new Date(date);
    return dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
}

function formatDateWithTimeEU(date) {
    let dt = new Date(date);
    return (
        dt.getDate() +
        "/" +
        (dt.getMonth() + 1) +
        "/" +
        dt.getFullYear() +
        " " +
        dt.getHours() +
        ":" +
        dt.getMinutes() +
        ":" +
        dt.getSeconds()
    );
}

function formatFormInputDate(date) {
    let dt = new Date(date);
    const day = ("0" + dt.getDate()).slice(-2);
    const month = ("0" + (dt.getMonth() + 1)).slice(-2);
    dt = dt.getFullYear() + "-" + month + "-" + day;
    return dt;
}

function formatDateShort(date) {
    return date.toString().slice(5, 10);
    return date.toString().split("T")[0];
}
function formatMonthDay(date) {
    return date.toString().slice(5, 10);
}

function getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
}
function getCurrentTime() {
    return new Date().toISOString().slice(10);
}

function getAge(date) {
    const birthdayDate = new Date(date);
    const birthYear = birthdayDate.getFullYear();
    const birthMonth = birthdayDate.getMonth();
    const birthDay = birthdayDate.getDate();

    const todayDate = new Date();
    const todayYear = todayDate.getFullYear();
    const todayMonth = todayDate.getMonth();
    const todayDay = todayDate.getDate();

    let age = todayYear - birthYear;

    if (todayMonth < birthMonth - 1) {
        age--;
    }
    if (birthMonth - 1 == todayMonth && todayDay < birthDay) {
        age--;
    }
    return age;
}

Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

const getDaysArray = function (startDate, endDate) {
    // get array of days between 2 dates
    let dateArray = new Array();
    let currentDate = startDate;
    while (currentDate <= endDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
};

export {
    formatJSDate,
    formatDateEU,
    formatDateWithTimeEU,
    formatFormInputDate,
    formatDateShort,
    formatMonthDay,
    getCurrentDate,
    getCurrentTime,
    getAge,
    getDaysArray,
};
