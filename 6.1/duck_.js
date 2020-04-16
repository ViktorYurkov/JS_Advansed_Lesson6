$(function () {
    let mouse_x = 0; //полодення мішені - показника миші
    let mouse_y = 0;

    let iterationTime = 120; //час на зміну взмаху і між ітераціями
    let iterationQuantity = 60; //ітерацій на переліт

    let level = 1; //рівень
    let balls = 0; //бали

    let idName = 'duck';

    let positionMin_y;
    let positionMax_y;
    let positionMin_x;
    let positionMax_x;
    let duckStart_x;
    let duckStart_y;
    let deltaX;
    let deltaY;
    let gun_x;
    let gun_y;

    let endGame = false;
    let ballsEnd = 0;

    function end() { //завершення гри
        setTimeout(function clock() {
            if (ballsEnd === balls) {
                endGame = true; /////////////////////////////////////////
                $('#info').text('КIНЕЦЬ ГРИ')
                $('#info').addClass('end');
                return;
            } else {
                ballsEnd = balls;
            }
            setTimeout(clock, 7000);
        }, 7000);
    }

    function startDuck() { //Дані для старту
        positionMin_y = $('.ducks').offset().top;
        positionMax_y = $('.ducks').offset().top + $('.ducks').height();
        positionMin_x = $('.ducks').offset().left;
        positionMax_x = $('.ducks').offset().left + $('.ducks').width() - 60;
        duckStart_x = positionMin_x;
        duckStart_y = Math.floor(Math.random() * (positionMax_y - positionMin_y) + positionMin_y);
        deltaX = (positionMax_x - positionMin_x) / iterationQuantity;
        deltaY = 0;
    }

    function duckFlew(duckId) {
        let duckNow_x = duckStart_x; //положення качки х
        let duckNow_y = duckStart_y; //положення качки у
        let dxNow = deltaX; // зміщення качки по х
        let dyNow = deltaY; // зміщення качки по у
        let iTime = iterationTime;

        $(duckId).on('click', function () { //подія при попаданні
            hittingDuuck();
        });

        // влучення в качку
        function hittingDuuck() {

            balls += 10; //збільшення балів
            dxNow = 0;
            dyNow = 30;
            $(duckId).addClass('duck2');

            setTimeout(function hitting() {
                if (endGame) return;

                if (dyNow = 30) {
                    //повернення на старт
                    $(duckId).removeClass('duck2');
                    startDuck();
                    duckNow_x = duckStart_x; //положення качки х
                    duckNow_y = duckStart_y; //положення качки у
                    dxNow = deltaX;
                    dyNow = deltaY;
                    iTime = iterTime;
                    return;
                }

                dyNow = 30;
                setTimeout(hitting, 500)

            }, 500);

            // умова підняття рівня
            if ((balls % 100) === 0 && balls !== 0) {
                balls += 10;
                level++;
                run(1);
                iterationTime -= 5; //прискорення часом
                iterationQuantity -= 7; //прискорення ітераціями

                //умова закінчення гри
                if (level > 6) {
                    endGame = true;
                    return;
                };

            };
            writeInfo(); //оновлення інформації на екран
        };


        $(duckId).css('top', duckNow_y);

        setTimeout(function list() { //ітерації польоту
            if (endGame) return;
            //виставлення обєкту в положення
            $(duckId).css('left', duckNow_x);
            $(duckId).css('top', duckNow_y);
            //зміщення на наступну ітерацію
            duckNow_x += dxNow;
            duckNow_y += dyNow;

            if (duckNow_x > (positionMax_x)) { // кінець зони польоту, повернення в початок
                startDuck();
                duckNow_x = duckStart_x; //положення качки х
                duckNow_y = duckStart_y; //положення качки у
                dxNow = deltaX;
                dyNow = deltaY;
            }

            $(duckId).toggleClass('duck_'); //взмах крил

            setTimeout(list, iTime);
        }, iTime);
    }

    let sumDuck = 0;

    //запуск кількості качок з затримкою 
    function run(quantityDuckFlew) {
        let duckId = '';
        let i = 0;

        startDuck();

        setTimeout(function runLevel() {
            if (endGame) return;

            duckId = idName + sumDuck;
            $('.ducks').append('<div class="duck" id=' + duckId + '></div>');

            duckFlew('#' + duckId);

            sumDuck++;
            i++;

            writeInfo(); //оновлення табло

            if (i > quantityDuckFlew - 1) {
                return;
            }
            startDuck();
            setTimeout(runLevel, 500 * i);
        }, 500)


    };

    // виведення інформації на табло
    function writeInfo() {
        $('#info1').text('Качок: ' + sumDuck);
        $('#info2').text('Бали:  ' + balls);
        $('#info3').text('Рівень:  ' + level);
    }

    function gun() { //повороти гвинтівки
        let degCel;
        gun_y = $('#gun').offset().top - mouse_y;
        gun_x = $('#gun').offset().left - mouse_x;

        degCel = Math.atan2(gun_y, gun_x) / Math.PI * 180 - 45;
        $('#gun').css('transform', 'rotate(' + degCel + 'deg)');
    }

    //положення мішені
    $('.zona').on("mousemove", function () {
        mouse_x = window.event.clientX;
        mouse_y = window.event.clientY;
        $('#cel').css('top', mouse_y);
        $('#cel').css('left', mouse_x);

        gun(); //повороти гвинтівки

    });

    run(3);
    end();

});
