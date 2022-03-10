let phoneAppLaunched = false;
let keyPadActive = false;
let AddContactClicked = false;
let dialogueDivActive = false;
function TabsNavi(param) {
    let recentTab = document.getElementById('RecentTabs');
    let contactsTab = document.getElementById('ContactsTab')
    if (param == 'Recent') {
        recentTab.style.display = 'block'
        contactsTab.style.display = 'none' 
    }
    else if (param == 'Contacts') {
        recentTab.style.display = 'none'
        contactsTab.style.display = 'block'
    }
}
function SetContactsList(params) {
    let myContactList = document.getElementById('myContactList')
    myContactList.innerHTML = ""
    // console.log(contactArr.sort((a,b) => console.log([a.Name, b.Name].sort())));
    // console.log(contactArr.sort((a,b) => a.Name b.Name));

    for (let i = 0; i < contactArr.length; i++) {
        let a = contactArr[i]
        let conTact = `
        <div id="aContactCon">
            <div id="aContact">
                <div id="icon">
                    ${a.Name.split("")[0].toUpperCase()} 
                </div>
                <div id="name">
                    <h6>${a.Name}</h6>
                </div> 
            </div>
        </div>
        `
        myContactList.innerHTML += conTact
    }
}
function ShowAddContact() {
    let norm = document.getElementById('norm')
    let addConDiv = document.getElementById('addConDiv')
    norm.style.display = 'none'
    addConDiv.style.display = 'block'
    AddContactClicked = true;
}
function GoBack() {
    if (dialogueDivActive == true) {
        let dialogueDiv = document.getElementById('dialogueDiv')
        let infoDiv = document.getElementById('infoDiv')
        let infoResultDiv = document.getElementById('infoResultDiv')
        infoDiv.style.display = 'flex'
        infoResultDiv.style.display ='none'
        dialogueDiv.style.display = 'none';
        dialogueDivActive = false;
        return;
    }
    
    else if (keyPadActive == true) {
        ShowKeypad('hide')
        keyPadActive = false;
        return;
    }
    else if (AddContactClicked == true) {
        let norm = document.getElementById('norm')
        let addConDiv = document.getElementById('addConDiv')
        addConDiv.style.display = 'none'
        norm.style.display = 'block'
        AddContactClicked = false;
        return;
    }
    else if (phoneAppLaunched == true) {
        scrollApps.style.display = 'block'
        bottomApps.style.display = 'block'
        phoneApp.style.display = 'none'
        return
    }
}
function GoToHome() {
    phoneApp.style.display = 'none'
    bottomApps.style.display = 'block'
    scrollApps.style.display = 'block'
}