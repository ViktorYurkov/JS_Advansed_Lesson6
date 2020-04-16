//GET
function servis(sumaUAN){
      var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    
    let nameValut = [["EUR", 'євро'], ["USD", 'дол'], ["RUR", "руб"]];
    let nameValutCurent = [];

    function serverData() {
        promiseGET(url)
            .then(function (response) {
                    let answer = JSON.parse(response);

                    let result = '';
                    for (let i = 0; i < answer.length; i++) {
                        nameValutCurent = nameValut.find(function (elem, id) {
                            if (elem[0] === answer[i].ccy) return true;
                        });

                        if (nameValutCurent !== undefined) {
                            result += sumaUAN + ' грн = ' + (sumaUAN / +answer[i].buy).toFixed(3) + ' ' + nameValutCurent[1] + '   <br><br>'
                        };
                    }
                    document.getElementById("result").innerHTML = result;

                },
                function (error) {
                    alert(error);
                });
    }

    function error(){
         document.getElementById("sumaUAN").style.background = 'rgb(250,200,200,0.5)';
        document.getElementById("sumaUAN").value = '';
    }

    if (typeof (+sumaUAN) === 'number' && +sumaUAN !== 0) {
        serverData();
    } else {
       error();
    }  
}

getMetod.onclick = function sendGetMetod() {
    let suma = document.getElementById("sumaUAN").value;
    servis(suma);
}


container.onkeyup =  function (){
    if (event.key === 'Enter'){
        let suma = document.getElementById("sumaUAN").value
        servis(suma);
    }else{
        //console.log(event.key);
    };
}

sumaUAN.onkeydown = function a() {
    document.getElementById("sumaUAN").style.background = 'white';
};
//
function promiseGET(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        }
        xhr.onerror = function () {
            reject(new Error('Nerwork error'));
        };
        xhr.send();
    });
}
