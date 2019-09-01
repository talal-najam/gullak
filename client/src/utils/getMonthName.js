Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

Date.prototype.getMonthName = function () {
    return this.monthNames[this.getMonth()];
};

var d = new Date();
d.getMonthName()


export const getMonthName = () => {
    return d.getMonthName();
};