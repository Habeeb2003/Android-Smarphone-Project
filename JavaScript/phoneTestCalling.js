let contactArr = []
let callDialogue = document.getElementById('callDialogue')
let topdiv = document.getElementById('topDiv')
let middleDiv = document.getElementById('middleDiv')
let seenInContact = false
let callLogDisp
if (localStorage.getItem('Contacts')) {
    let localContacts = localStorage.getItem('Contacts')
    contactArr = JSON.parse(localContacts)
    SetContactsTable()
    console.log(contactArr);
}

function CallPhoneNumber(params) {
    let callerContactName = document.getElementById('callerContactName')
    let callerNo = document.getElementById('callerNo')
    let callStatus = document.getElementById('callStatus')
    let callingSim = document.getElementById('callingSim')
    
    callDialogue.style.display = 'flex'
    topdiv.style.display = 'none'
    middleDiv.style.display = 'none'
    callStatus.innerHTML = 'Calling...'
    callingSim.innerHTML = params
    for (let i = 0; i < contactArr.length; i++) {
        let a = contactArr[i]
        if (pinInputBox.value == a.Number) {
            callerContactName.innerHTML = a.Name
            callerNo.innerHTML = a.Number
            console.log(contactArr[i]);
            callLogDisp = a.Name
            seenInContact = true;
        }
        if (seenInContact == false && i == contactArr.length - 1) {
            callerContactName.style.display = 'none'
            callerNo.innerHTML = pinInputBox.value
            callerNo.style.fontSize = '24px'
            callLogDisp = callerNo.innerHTML
        }
    }
    seenInContact = false;
    
}
function EndCall(params) {
    callDialogue.style.display = 'none'
    topdiv.style.display = 'Block'
    middleDiv.style.display = 'Block'
    CallLog(callLogDisp, params)
}
function SaveContact(params) {
    let a = document.getElementsByClassName('contactInfo')
    let newContact = {Name: "", Number: "", SavedOn: ""}
    for (let i = 0; i < a.length; i++) {
        let b = a[i]
        if (i == 0) {
            newContact.SavedOn = b.value;
        }
        else if (i == 1) {
            newContact.Name = b.value
        }
        else if (i == 2) {
            newContact.Number = b.value;
        }
    }
    if (a[1].value == "") {
        alert('Please Input a "Name"')
        return
    }
    else if (a[2].value == "") {
        alert('Please input a "Number"')
        return
    }
    contactArr.push(newContact)
    console.log(contactArr);
    localStorage.setItem('Contacts', JSON.stringify(contactArr))
    SetContactsTable()
    SetContactsList()
}
function SetContactsTable(params) {
    let myTable = document.getElementById("contactTable")
    myTable.innerHTML = `<tr><th>Name</th><th>Number</th><th>Saved On</th></tr>`
    for (let i = 0; i < contactArr.length; i++) {
        let a = contactArr[i]
            myTable.innerHTML += `<tr><td>${a.Name}</td><td>${a.Number}</td><td>${a.SavedOn}</td><tr>`  
    }
}