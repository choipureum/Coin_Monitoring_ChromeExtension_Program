// Copyright 2021 최푸름
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd


const meg = document.getElementById("amazing");
const keySubmit = document.getElementById("keySubmit");
const KeySW = false; // api Key 로 로그인 되어 있는지 
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


function getKey() {

    chrome.storage.sync.get(['publicKey', 'secretKey'], (result) => {
        publicKey.value  = result.publicKey;
        secretKey.value = result.secretKey;

        if (!publicKey.value == "" || !publicKey.value == null) {
            console.log(result);
            setMessage("key load Complete!!");
            KeySw = true;
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



async function getList() {




}
//////////////////////////////////////////////////////////////////////////////
