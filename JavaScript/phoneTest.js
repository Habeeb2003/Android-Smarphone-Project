let phoneApp = document.getElementById('phoneApp')
let scrollApps = document.getElementById('scrollApps')
let botttomApps = document.getElementById('bottomApps')

function OpenPhoneApp(params) {
    scrollApps.style.display = 'none'
    bottomApps.style.display = 'none'
    phoneApp.style.display = 'block'
    phoneAppLaunched = true;

}

function ShowKeypad(params) {
    let a =  document.getElementById('keypad')
    if (params == 'show') {
        a.style.display = 'block'
        a.classList.add('skeypad')
        a.classList.remove('hkeypad')
        keyPadActive = true;
    }
    else if (params == 'hide') {
        a.classList.remove('skeypad')
        a.classList.add('hkeypad')
        setTimeout(() => {
            a.style.display = 'none'
        }, 1000);
    }
}