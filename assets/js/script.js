const expresionRegular = /^[0-9]+$/;

const login = (event) =>{

    event.preventDefault();

    let codigoHeroe = $('#codHeroe').val();

    if (expresionRegular.test(codigoHeroe)){
        console.log(codigoHeroe)
        alert("felicidades")
    }else{
        alert("error")
    }
}

let form = $("#formulario");

form.on("submit", login);