export const formDate = value =>{
    const date = new Date(value); 
    const month = ['january','february','march','april','may','june','july','august','september','october','november','december'];
    var righthours = date.getUTCHours()+3;
    if(righthours === 24){
        righthours = 0
    }else if(righthours === 25){
        righthours = 1
    }else if(righthours === 26){
        righthours = 2
    }else if(righthours === 27){
        righthours = 3
    }
    const object = {
        hours: righthours,
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        day: date.getDate(),
        month: month[date.getUTCMonth()],
        year: date.getFullYear(),
    }
    return object
}