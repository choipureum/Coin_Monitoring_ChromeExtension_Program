// Copyright 2021 최푸름
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd


const meg = document.getElementById("amazing");
const keySubmit = document.getElementById("keySubmit");
var KeySW = false; // api Key 로 로그인 되어 있는지 
/**
 * 
 * key info chrome.storage
 * set get
 * 
 *  */
//////////////////////////////////////////////////////////////////////////////
//저장되있는 key 정보 호출
var publicKey = document.getElementById("publicKey");
var secretKey = document.getElementById("secretKey");
getKey();
//////////////////////////////////////////////////////////////////////////////

function getKey() {

    chrome.storage.sync.get(['publicKey', 'secretKey'], (result) => {
        publicKey.value  = result.publicKey;
        secretKey.value = result.secretKey;

        if (!publicKey.value == "" || !publicKey.value == null) {
            console.log(result);
            setMessage("key load Complete!!");
            KeySW = true;

        }
        else {
            setMessage("key정보가 존재하지 않습니다. \n 등록해주시기 바랍니다.");
        }
    });
}

//key 저장
function save() {
    alert("key save!");
    chrome.storage.sync.set({ "publicKey": publicKey.value, "secretKey": secretKey.value }, () => {
        console.log(publicKey.value);
        console.log(secretKey.value);
        setMessage("key save complete!!");

    });
}
//// key submit 등록

keySubmit.addEventListener("click", save);
//////////////////////////////////////////////////////////////////////////////

/**
 * getList
 * 
 */
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////


/* 보류
function GetAccounts() {
    var request = new XMLHttpRequest();
    var url = 'https://api.upbit.com/v1/accounts';
    const payload = {
        access_key: publicKey.value,
        nonce: (new Date).getTime(),
    }
    const token = jwt.sign(payload, secretKey.value)

    request.open("GET", url, false);
    request.send();
    var obj = JSON.parse(request.responseText);
    console.log(obj);
}
*/
/**
 * 
 *마켓 정보 List Ticker 조회
 * MarketCoinList();
 * 
 * */
function MarketCoinList() {
    var request = new XMLHttpRequest();
    var url = 'https://api.upbit.com/v1/market/all';

    request.open("GET", url,false);
    request.send();
    var KRW_coin = [];
    var obj = JSON.parse(request.responseText);

    obj.forEach(function (coin) {
        if (coin.market.substring(0, 3) == "KRW") {
            KRW_coin.push(coin)
        }
    });
    return KRW_coin;
}
/**
 * //마켓 Ticker 조회
 * MarketCoin('KRW', 'BTC');
 * @param {any} market
 * @param {any} coin
 */

function MarketCoin(market) {
    var request = new XMLHttpRequest();
    var url = 'https://api.upbit.com/v1/ticker?markets=' + market;

    request.open("GET", url, false);
    request.send();
    var obj = JSON.parse(request.responseText);
    return obj;
}
/**
 * //캔들 조회
 * MarketCoincandles('KRW', 'STEEM', 5, 3);
 * 
 * @param {any} market
 * @param {any} coin
 * @param {any} timeVal
 * @param {any} count
 */
function MarketCoincandles(market, coin, timeVal, count) {
    var request = new XMLHttpRequest();
    var url = 'https://api.upbit.com/v1/candles/minutes/' + timeVal + '?market=' + market + '-' + coin + '&count=' + count;

    request.open("GET", url,false);
    request.send();
    var obj = JSON.parse(request.responseText);
    console.log(obj);
}

//////////////////////////////////////////////////////////////////////////////

var KRW_coin = [
    {
        "market": "KRW-MLK",
        "korean_name": "밀크"
    },
    {
        "market": "KRW-MVL",
        "korean_name": "엠블"
    },
    {
        "market": "KRW-BTC",
        "korean_name": "비트코인"
    },
    {
        "market": "KRW-BORA",
        "korean_name": "보라"
    }
];
  
getList("");

function getList(myCoin) {
    //Get Coin
    //var KRW_coin = MarketCoinList();
   
    KRW_coin.forEach(function (coin) {
        
        //var korean_name = coin.korean_name;      
        //var coinDetail = MarketCoin(coin.market)[0];
        var korean_name = coin.korean_name;      
        var coinDetail = MarketCoin(coin.market)[0];
        var price = coinDetail.trade_price;
        var closing_price = coinDetail.prev_closing_price;
        status = "black";
        if (coinDetail.change == "RISE") { status = "red" }
        else if (coinDetail.change == "FALL") { status = "blue" }

        var percent = coinDetail.signed_change_rate * 100;
        
        //작성
        var szHtml = [];
        var el = document.getElementById("table-body");
        var htmlObject = document.createElement('tr');
        szHtml.push('   <td>' + korean_name + '</td>');
        szHtml.push('   <td>' + price + '</td>');
        szHtml.push('   <td>' + closing_price + '</td>');
        szHtml.push('   <td>' + financial(percent)+ '</td>');
        htmlObject.innerHTML = szHtml.join('');
        htmlObject.style.color = status;
        el.prepend(htmlObject);
    });
}


//////////////////////////////////////////////////////////////////////////////

/**
 * prototype
 * @param {any} str
 */
//////////////////////////////////////////////////////////////////////////////
function setMessage(str) {
    message.textContent = str;
    message.hidden = false;

}

function clearMessage() {
    message.hidden = true;
    message.textContent = "";
}
function financial(x) {
    return Number.parseFloat(x).toFixed(2);
}

//////////////////////////////////////////////////////////////////////////////


