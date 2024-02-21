$(document).ready(function () {

    const expresionRegular = /^[0-9]+$/;

    let tarjetaSection = $('#tarjeta');
    let imagen = $('#imagen');
    let nombreHero = $('#nombreHero');
    let conexiones = $('#conexiones');
    let publicadoPor = $('#publicadoPor');
    let ocupacionHero = $('#ocupacionHero');
    let primeraAparicion = $('#primeraAparicion');
    let alturaHero = $('#alturaHero');
    let pesoHero = $('#pesoHero');
    let alianzas = $('#alianzas');

    tarjetaSection.hide();

    const buscar = (event) => {
        event.preventDefault();

        let codHero = $('#codHero').val();

        if (expresionRegular.test(codHero)) {

            tarjetaSection.show();

            imagen.attr('src', `assets/img/${codHero}.jpg`);
            nombreHero.text();
            conexiones.text();
            publicadoPor.text();
            ocupacionHero.text();
            primeraAparicion.text();
            alturaHero.text();
            pesoHero.text();
            alianzas.text();

            $('html, body').animate({
                scrollTop: $('#tarjetaSection').offset().top
            }, 1000);

        } else {
            alert("El codigo ingresado no es valido.")
        }
    }

    $("#buscar").on("click", buscar);
});