$(document).ready(function () {

    //expresion regular que solo acepta valores numericos
    const expresionRegular = /^[0-9]+$/;

    //desactiva visibilidad de la seccion tarjeta
    $('#tarjeta').hide();

    const buscar = (event) => {
        event.preventDefault();

        //Obtencion de codigo super heroe ingresado en el input.
        let codHero = $('#codHero').val();

        //Validacion si codigo ingresado se encuentra dentro del rango y si es un valor numerico
        if (expresionRegular.test(codHero) && codHero > 0 && codHero <= 731) {

            //activa visibilidad de la seccion tarjeta
            $('#tarjeta').show();

            //llamada a la API y sus funciones de llenado dinamico para grafico y tarjeta
            $.ajax({
                //url: `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/3387770791513256/${codHero}`,
                url: `https://www.superheroapi.com/api.php/3387770791513256/${codHero}`,
                type: 'GET',
                success: function (response) {
                    console.log("Objeto response: ", response)

                    // para setear el formato del peso.
                    let pesoHero = response.appearance.weight;
                    let peso = '';
                    for (let i = 0; i < pesoHero.length; i++){
                        peso += pesoHero[i];
                        if (i < pesoHero.length - 1) {
                            peso += ' - ';
                        }
                    }

                    // para setear el formato de la altura.
                    let alturaHero = response.appearance.height;
                    let altura = '';
                    for (let i = 0; i < alturaHero.length; i++){
                        altura += alturaHero[i];
                        if (i < alturaHero.length - 1) {
                            altura += ' - ';
                        }
                    }

                    //asignacion dinamica de propiedades en tarjeta
                    $('#imagen').attr('src', response.image.url);
                    $('#nombreHero').text(response.name);
                    $('#conexiones').text(response.connections['group-affiliation']);
                    $('#publicadoPor').text(response.biography.publisher);
                    $('#ocupacionHero').text(response.work.occupation);
                    $('#primeraAparicion').text(response.biography['first-appearance']);
                    $('#alturaHero').text(altura);
                    $('#pesoHero').text(peso);
                    $('#alianzas').text(response.biography.aliases);

                    //asignacion de valores dinamicos para powerstats en el datapoint utilizando keys y values para mostrar la informacion.
                    let dataPoints = [];
                    let datosApi = response.powerstats;
                    for (let i = 0; i < datosApi.length; i++) {
                        dataPoints.push({ x: new Date(datosApi[i]) });
                    }
                    Object.entries(datosApi).forEach(([key, value]) => {
                        dataPoints.push({
                            label: key,
                            y: parseInt(value)
                        });
                    });

                    //Grafico Tarta dinamico
                    var chart = new CanvasJS.Chart("chartContainer", {
                        theme: "light2",
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: "Estadisticas de Poder"
                        },
                        data: [{
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}%",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 12,
                            indexLabel: "{label} - {y}%",
                            dataPoints: dataPoints
                        }]
                    });

                    //renderizado del grafico
                    chart.render();

                },
                dataType: 'json',
                error: function (error) {
                    console.log("Objeto error: ", error)
                    console.error('Error al obtener los datos:', error.status);
                }
            });

            //animacion que luego de apretar boton buscar redirige a la seccion tarjeta
            $('html, body').animate({
                scrollTop: $('#tarjetaSection').offset().top
            }, 1000);

        } else {
            alert("El codigo ingresado no es valido o no existe.")
        }
    }

    //asignacion evento buscar codigo superHero
    $("#buscar").on("click", buscar);
});