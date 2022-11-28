const checkInBtn = document.getElementById("checkInBtn-bottom"); //Check In button at home page
const weatherDisplay = document.querySelector("#weather-display") //weather display div
const pWeather = document.getElementById("weather");
const waitingArea = document.querySelector("#waitingArea"); //waiting area div
const paraWaitingArea = document.querySelector("#paraCustWaiting") //paragraph for Customer Waiting

let currentDate =  new Date();
let cDay = currentDate.getDate()
let cMonth = currentDate.getMonth() + 1
let cYear = currentDate.getFullYear()
let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
let setTime = `${cYear}-${cMonth}-${cDay}T0${currentDate.getHours()}:00`;


let custWaiting = 0; //number of customers waiting is set to 0 in the beginning
console.log("Number of customer waiting",custWaiting);

displayWaitCount(custWaiting); //invokes the function to display number of customers waiting at home page

checkInBtn.addEventListener("click",updateDisplayWaitCount);

//Function to update number of customers waiting
function updateDisplayWaitCount(event){
    console.log("Event ",event);
    event.preventDefault();
    console.log("Check in button is clicked");
   custWaiting++;
    console.log("Updated number of customers ", custWaiting);
    displayWaitCount(custWaiting);
    placeInQueue();
}

//Prompt number of customers that are waiting
function placeInQueue(){
    const rank = document.getElementById("rank"); //stores rank from home page
    const lastName = document.getElementById("lastName") //stores lastName from home page
    alert(`${rank.value} ${lastName.value}, Your place in queue is ${custWaiting}!`);
}

//Displays number of customers waiting at home page
function displayWaitCount(CustWaiting){
    if (CustWaiting <= 1){
        paraWaitingArea.innerText = `${CustWaiting} Customer waiting`;
        waitingArea.append(paraWaitingArea);
    } else{
        paraWaitingArea.innerText = `${CustWaiting} Customers waiting`;
        waitingArea.append(paraWaitingArea);
    }   
};

//Function to get key of an object by its value
function getObjKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
  }

//Function to convert Celcius to Farenheight
function convertToF(celsius) {
    let fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit;
  }

$.get({
    url: "https://api.open-meteo.com/v1/forecast?latitude=36.53&longitude=-87.36&hourly=temperature_2m,relativehumidity_2m,windspeed_10m",
    success: (data)=>{
        console.log(data);

        const pLocation = document.createElement("p")
        const pTimezone = document.createElement("p");
        const pDateTime = document.createElement("p");
        const pTemperature = document.createElement("p");
        weatherDisplay.append(pLocation);
        weatherDisplay.append(pTimezone);
        weatherDisplay.append(pDateTime);
        weatherDisplay.append(pTemperature);

        pLocation.append("Clarksville:");
        pTimezone.append("Timezone: " + data["timezone"]);
        pDateTime.append(setTime);

        let requiredIndex = getObjKey(data["hourly"]["time"],setTime);
        let tempInC = data["hourly"]["temperature_2m"][requiredIndex];
        console.log("required index is ", requiredIndex);
        console.log("temp in C is ", tempInC);
        console.log("Current Time is ", setTime);
        
        let tempInF = convertToF(tempInC);
        
        let currentTemp = `Temp: ${tempInF}F`;
    
        pTemperature.append(currentTemp);
    },
    error: (e)=>{
        console.log(e);
    }
});


