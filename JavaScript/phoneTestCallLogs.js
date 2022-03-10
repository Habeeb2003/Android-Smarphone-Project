let callLogArr = []
let date = new Date()
console.log(date.getMinutes());
let mediaContainer = document.getElementById('mediaContainer')

if (localStorage.getItem("CallLogs")) {
    let a = localStorage.getItem("CallLogs")
    callLogArr = JSON.parse(a)
    setCallLogs()
    console.log(callLogArr);
}
function setCallLogs(params) {
    mediaContainer.innerHTML = ""
    for (let i = 0; i < callLogArr.length; i++) {
        let b = callLogArr[i]
        mediaContainer.innerHTML += b.Log
        
    }
}
function CallLog(callIdentification, callSimIdentification){
    let timeStamp
    let newCallLog = {Log: "",callIdentifier: callIdentification, simIdentifier: callSimIdentification, callTimeStamp: ""}
    newCallLog.Log = `
    <div id="media">
        <div id="right">
            <div  style="background-color: blueviolet; width: 30px; height: 30px; border-radius: 15px;"> 
            </div>
        </div>
        <div id="center">
            <h6 class="mb-0"> ${callIdentification}</h6>
            <p class="mb-0"> <span class="mr-2">${callSimIdentification}</span>Custom</p>
        </div>
        <div id="left">
            <div>
                <span>2 days ago</span><span class="fa fa-search"></span>
            </div>
        </div>
    </div>
    `
    callLogArr.unshift(newCallLog)
    localStorage.setItem("CallLogs", JSON.stringify(callLogArr))
    setCallLogs()
    // console.log(param1, param2);
}