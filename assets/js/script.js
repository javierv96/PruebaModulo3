$(document).ready(function () {

    const expresionRegular = /^[0-9]+$/;

    const buscar = (event) => {
        event.preventDefault();

        let codHero = $('#codHero');

        if (expresionRegular.test(codHero.val())) {
            console.log(codHero)
            alert("felicidades")
        } else {
            alert("El codigo ingresado no es valido.")
        }
    }

    $("#buscar").on("click", buscar);
});