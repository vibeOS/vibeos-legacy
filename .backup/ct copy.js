// CT OpenCode data for this script.
var ct_opencodedata = {
    project: 'vibeos',
    lang: 'javascript',
    file: 'ct',
    dir: '/scripts/ct.js'
}

// Fast way to initalize a webview for testing. DO NOT USE THIS IN SCRIPTS!
// This is only for usage in the Javascript terminal.
// 2020 07 18
function ct_initweb(url,proxy) {
    initWebView('CT QWC', 'mimetypes/16/html.png', url, 800, 600, proxy);
    return 'Initialized Webview. Proxy: '+proxy+' | URL: '+url;
}

// Function to test that ct.js loaded successfully, used for debugging.
// 2020 07 18
function ct_test() {
    return 'Successful';
}

// Function to process errors depending on severtiy
// 2020 07 18
function ct_error(script,reason,alert) {
    console.error('CT: Error occoured at '+script+' with reason: '+reason);
    if (alert == true) {
        alert("An error occoured in "+script+". Check the console for details.");
    } else {
        console.log("CT: Error was not prompted to user.");
    }
    return 'ok';
}

// [BROKEN] Function to get a cat from the CAT API
// This shit doesnt work because i suck with HTTP requests
// 2020 07 18
function ct_getcat() {
    var dnctv_cathttp = new XMLHttpRequest();
    var dnctv_caturl = 'https://api.thecatapi.com/v1/images';

    dnctv_cathttp.open("GET", dnctv_caturl);
    dnctv_cathttp.setRequestHeader('api-key','2b032810-c828-48e7-8c8c-c7a83907e312'); // pls no steal api key thank
    dnctv_cathttp.send();

    dnctv_cathttp.onreadystatechange = (e) => {
        console.log(dnctv_cathttp.responseText);
    }

    return 'as of 07 18 this does not work';
}