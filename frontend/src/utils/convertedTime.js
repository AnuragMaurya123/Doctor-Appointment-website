

const convertedTime = time=>{
    //timeSplit will return array
    let timeSplit=time.slice(":")
    let hour = parseInt(timeSplit[0])
    let minutes = parseInt(timeSplit[1])
    let meridian = "am"
    if (hour >= 12) {
        meridian="pm"
        if (hour>12) {
            hour-=12
        }else if (hour === 0) {
            hour = 12; // Handle midnight (00:00 as 12:00 AM)
        }
    }

    return hour.toString().padStart(2)+":" +minutes.toString().padStart(2,"0")+" "+meridian
}

export default convertedTime