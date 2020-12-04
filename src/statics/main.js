$('document').ready(()=>{
    console.log('listo');

    $('.container__form--login').hide();

    $('#change-login').click(()=>{
        $('.container__form--register').hide();
        $('.container__form--login').show();
    });

    $('#change-register').click(()=>{
        $('.container__form--login').hide();
        $('.container__form--register').show();
    });
})