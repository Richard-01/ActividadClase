import { URL_COMPANIES } from '../modules/urls.js'
import { addRegister } from '../modules/endpoints.js'

const d = document,
    formRegister = d.getElementById("formRegister"),
    email = d.getElementById("email"),
    password = d.getElementById("password"),
    passConfirmation = d.getElementById("passConfirmation"),
    company = d.getElementById("company"),
imgCompany = d.getElementById("imgCompany");

formRegister.addEventListener("submit", (e)=> {
    e.preventDefault();
    register();
});

async function register () {

    if ( password.value.length < 6 ) {
        alert("La contraseña debe tener mas de 6 caracteres.");
        return;
    }

    if ( password.value != passConfirmation.value ) {
        alert("Las contraseña no son iguales.")
        return;
    }

    const req = await fetch(`http://${URL_COMPANIES}`);
    const res = await req.json();

    for (let i = 0; i < res.length; i++) {
        if ( res[i].email === email.value || res[i].nit === password.value ) {
            alert("Esta empresa ya esta registrada");
            return;
        }
    }

    const dataCompanie = {
        email: email.value,
        nameCompany: company.value,
        imageCompany: imgCompany.value,
        nit: password.value
    }

    addRegister(`http://${URL_COMPANIES}`,dataCompanie);

    alert("Usuario registrado exitosamente");
    window.location.href = 'index.html'

}

