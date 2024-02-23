$(document).ready(function () {

    const expresionRegular = /^[0-9]+$/;

    $('#tarjeta').hide();

    const buscar = (event) => {
        event.preventDefault();

        let codHero = $('#codHero').val();

        if (expresionRegular.test(codHero)) {

            $('#tarjeta').show();

            $.ajax({
                url: `https://superheroapi.com/api/3387770791513256/${codHero}`,
                type: 'GET',
                success: function(response) {
                    console.log("Objeto response: ", response)

                    $('#nombreHero').text(response.name);

                    // $('#imagen').attr('src', response.image.url);
                    // $('#nombreHero').text(response.name);
                    // $('#conexiones').text(response.connections['group-affiliation']);
                    // $('#publicadoPor').text(response.biography.publisher);
                    // $('#ocupacionHero').text(response.work.occupation);
                    // $('#primeraAparicion').text(response.biography['first-appearance']);
                    // $('#alturaHero').text(response.appearance.height);
                    // $('#pesoHero').text(response.appearance.weight);
                    // $('#alianzas').text(response.biography.aliases);

                },    
                dataType: 'json',
                error: function(error) {
                    console.log("Objeto error: ", error)
                    console.error('Error al obtener los datos:', error.status);
                }
            });

            $('html, body').animate({
                scrollTop: $('#tarjetaSection').offset().top
            }, 1000);

        } else {
            alert("El codigo ingresado no es valido.")
        }
    }

    $("#buscar").on("click", buscar);
});