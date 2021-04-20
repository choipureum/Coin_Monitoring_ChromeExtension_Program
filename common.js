// Copyright 2021 최푸름
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd


const meg = document.getElementById("amazing");


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

if (!publicKey.innerText == "" ) {
    chrome.storage.sync.get(['publicKey', 'secretKey'], (result) => {
        publicKey.text = result.publicKey + "/";
        secretKey.text = result.secretKey + "/";
    });
}
else {
    setMessage("key정보가 존재하지 않습니다. \n 등록해주시기 바랍니다.");
}


//key 저장
function save(publicKey, secretKey) {
    chrome.storage.sync.set({ publicKey: publicKey, secretKey: secretKey }, () => {
        setMessage("key save complete!!");
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

meg.addEventListener('click', hello);

async function getList() {
    



}
//////////////////////////////////////////////////////////////////////////////
