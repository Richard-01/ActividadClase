import { URL_COMPANIES } from '../modules/urls.js'

if (localStorage.getItem("id")) {
    window.location.href = 'administrator.html'
}

const d = document,
    formLogin = d.getElementById("formLogin"),
    email = d.getElementById("email"),
    password = d.getElementById("password")

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    login()
})

async function login () {
    const req = await fetch(`http://${URL_COMPANIES}?email=${email.value}`)
    const res = await req.json()

    if ( res.length == 0 ) {
        alert("Usuario o contraseña incorrectos")
        return
    } 

    if ( res.length != 0 && res[0].nit != password.value) {
        alert("Usuario o contraseña incorrectos")
        return
    }

    if ( res.length != 0 && res[0].nit == password.value) {
        localStorage.setItem("id", res[0].id)
        window.location.href = 'administrator.html'
        return
    }
}