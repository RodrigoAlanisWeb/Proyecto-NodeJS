$('document').ready(() => {
    console.log('listo');

    $('.container__form--login').hide();

    $('#change-login').click(() => {
        $('.container__form--register').hide();
        $('.container__form--login').show();
    });

    $('#change-register').click(() => {
        $('.container__form--login').hide();
        $('.container__form--register').show();
    });

    let contador = 1;

    $('.header__optionsList').hide();

    $('#options').click(() => {
        contador++;
        if (contador > 2) {
            contador = 1;
        }

        switch (contador) {
            case 1:
                $('.header__optionsList').hide('fadeout');
                break;
            case 2:
                $('.header__optionsList').show('fadein');
                break;
        }

        console.log(contador);
    })
})

