export const formDate = value =>{
    const date = new Date(value); 
    const month = ['january','february','march','april','may','june','july','august','september','october','november','december'];
    const object = {
        hours: date.getUTCHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        day: date.getDate(),
        month: month[date.getUTCMonth()],
        year: date.getFullYear(),
    }
    return object
}