
let AirtelUssdCode = ["*126*", "141", "140"]
let GlobacomUssdCode = ["*123*", "127", "777"]
let pinInputBox = document.getElementById('keypadInput')
let pinCodeBox = document.querySelector('input[type=number]')
let voucherArr = []
let ussdCode = ""
let pinCode = ""
let seenPin = false
let wantToCall

if (localStorage.getItem("myVoucherArr")) {
    let getMyLS = localStorage.getItem("myVoucherArr")
    voucherArr = JSON.parse(getMyLS)
    setVou()
    console.log(voucherArr);
}
function setVou(params) {
    let myTable = document.getElementById("table")
    myTable.innerHTML = `<tr><th>Name</th><th>Amount</th><th>Pin</th><th>isLoaded</th></tr>`
    for (let i = 0; i < voucherArr.length; i++) {
        let a = voucherArr[i]
            myTable.innerHTML += `<tr><td>${a.name}</td><td>${a.amount}</td><td>${a.pin}</td><td>${a.isLoaded}</td><tr>`  
    }
}
function GenPin() {  
    let a = Math.floor(Math.random() * 10000000000000000)
    pinCodeBox.value = a
}
function Push() {
    let myVou = document.querySelectorAll('#vou')
    let newObject = {name: "", amount: "", pin: "", isLoaded: ""}
    for (let i = 0; i < myVou.length; i++) {
        if (i == 0) {
            newObject.name = myVou[i].value
        }
        else if (i == 1) {
            newObject.amount = myVou[i].value
        }
        else if (i == 2) {
            newObject.pin = myVou[i].value
            newObject.isLoaded = false;
        }
    } 
    if (pinCodeBox.value == "") {
        alert('Please generate a pin')
    }
    else if (myVou[0].value == "Select Network") {
        alert("Please select a Network")
    }
    else if (myVou[1].value == "Select Amount") {
        alert("Please select an Amount")
    }
    else{
        voucherArr.push(newObject)
        pinInputBox.value = ""
        localStorage.setItem("myVoucherArr", JSON.stringify(voucherArr))
        setVou()
    }
}



let infoDiv = document.getElementById('infoDiv');
function dispNum(params) {
    pinInputBox.value += params
}
function del(params) {
    if (params == "del") {
        let main = pinInputBox.value.slice(0,pinInputBox.value.length-1);
        pinInputBox.value=main;
        return
    }
}
function HashStar(params) {
    pinInputBox.value += params
}
function loadCard(params) {
    if (pinInputBox.value == "") {
        let t = "Input is empty"
        ShowLoader(t, 500)
        return
    }
    if (pinInputBox.value.includes('*') || pinInputBox.value.includes('#')) {
        wantToCall = false;
    }
    else{
        wantToCall = true;
    }
    
    if (wantToCall == true) {
        let simIndex
        if (params == 'Airtel') {
            simIndex = 1
        }
        else if (params =='Globacom') {
            simIndex = 2
        }
        CallPhoneNumber(simIndex)
    }
    if (wantToCall == false) {
        ussdCode = pinInputBox.value.slice(0, 5)
        pinCode = pinInputBox.value.slice(5, pinInputBox.value.length-1)
        if (pinInputBox.value.startsWith("*") == false) {
            let t = "invalid Input: input did not start with *"
            ShowLoader(t, 500)
            return
        }
        if (pinInputBox.value.endsWith("#") == false) {
            let t = "invalid Input: input did not end with #"
            ShowLoader(t, 500)
            return
        }
        if (params == "Airtel") {
            AirtelLoadCard(params)
        }
        if (params == "Globacom") {
            GlobacomLoadCard(params)
        }
    }
}
function AirtelLoadCard(params) {
    if (AirtelUssdCode.includes(ussdCode)) {
        for (let i = 0; i < voucherArr.length; i++) {
            let dd = voucherArr[i]
            if (pinCode == dd.pin) {
                if (params == dd.name) {
                    seenPin = true;
                    if (dd.isLoaded == false) {
                        let t = "You have successfully recharge " + dd.amount + " " + dd.name + " recharge Card"
                        ShowLoader(t, 2000)
                        dd.isLoaded = true
                        localStorage.setItem('myVoucherArr', JSON.stringify(voucherArr))
                        setVou()
                    }
                    else if (dd.isLoaded == true) {
                        let t = "Voucher Card has been used by you"
                        ShowLoader(t, 2000)
                    }
                    seenPin = false
                    break
                }
            }
            if (i == voucherArr.length - 1 && seenPin == false) {
                let t = "invalid Pin"
                ShowLoader(t, 500)
            }
        }
    }
    else{
        let t = "Please input a valid Ussd Code for" + params
        ShowLoader(t, 500)
    }
}
function GlobacomLoadCard(params) {
    if (GlobacomUssdCode.includes(ussdCode)) {
        for (let i = 0; i < voucherArr.length; i++) {
            let dd = voucherArr[i]
            if (pinCode == dd.pin) {
                if (params == dd.name) {
                    seenPin = true;
                    if (dd.isLoaded == false) {
                        let t = "You have successfully recharge " + dd.amount + " " + dd.name + " recharge Card"
                        ShowLoader(t, 2000)
                        dd.isLoaded = true
                        localStorage.setItem('myVoucherArr', JSON.stringify(voucherArr))
                        setVou()
                    }
                    else if (dd.isLoaded == true) {
                        let t = "Voucher Card has been used by you"
                        ShowLoader(t, 2000)
                    }
                    seenPin = false
                    break
                }
            }
            if (i == voucherArr.length - 1 && seenPin == false) {
                let t = "invalid Pin"
                ShowLoader(t, 500)
            }
        }
    }
    else{
        let t = "Please input a valid Ussd Code for" + params
        ShowLoader(t, 500)
    }
}

function ShowLoader(param1, param2) {
    let dialogueDiv = document.getElementById('dialogueDiv')
    let infoDiv = document.getElementById('infoDiv')
    let infoResultDiv = document.getElementById('infoResultDiv')
    dialogueDiv.style.display = 'flex';
    dialogueDivActive = true;
    setTimeout(() => {
        infoDiv.style.display = 'none'
        infoResultDiv.style.display ='block'
        infoResultDiv.innerHTML = param1;
    }, param2);
}