/*
    ctaetcsh's Personal Script
    For questions, please ask me in Discord

    DO NOT MODIFY WITHOUT PRIOR NOTICE & PERMISSION
    This script is backed up as it is updated.

    Last updated: July 25, 2020
*/

//                      this script is basically a lot of random/pointless/useless code
//                      still dont delete it i might need it later thanks

// CT OpenCode data for this script.
var ct_opencodedata = {
    project: 'vibeos',
    lang: 'javascript',
    file: 'ct',
    dir: '/scripts/ct.js'
}

// Random Varibles
var ok = 'ok';
const urlParams = new URLSearchParams(window.location.search);

// Debugging Quickstart Check (ctsu) 
//                              MORE FUCKING SHIT THAT DOESNT FUCKING WORK WHY DO I EVEN TRY
const ctsp = urlParams.get('ctsu');
if (ctsp == true) {
    ctsu() 
} else if (ctsp == false) {
    ct_log("ctsp found false, ctsu not engaged");
} else {
    ct_error("ctsu checker","ctsp found nothing, presumed false, ctsu not engaged",false);
}

// sets stuff for debugging quickstart (ctsu)
function ctsu() {
    msize.w = 1920;
    msize.h = 1080;
    background.value = "wallpapers/ct.png";
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


// alias for console.log
function ct_log(thing) {
    console.log(thing);
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


// [BROKEN] Function to import and apply profile data
// not done yet, maybe some of you can figure this shit out cause i cant
// 2020 07 18
function ct_importprofile() {

    fetch("https://raw.githubusercontent.com/vibedivde/vibeOS/master/debug.vosp.json?token=ALUVJHBVH6SXNCKKTPDMFWC7CQPRM").then(response => response.text()).then((response) => {
        var ct_profiledata = JSON.parse(response);
    })

    console.log(ct_profiledata.name+' '+ct_profiledata.type);
    return ok;
}

// ct popupbox tester function
function cttest_popupbox() {ct_popupbox("err","Test popup box.","Tester")};
// Function to show a popup box to the user.
// honestly some of my favorite code because of how well it came together 
// !! THIS IS STILL WORK IN PROGRESS, FUNCTIONALITY INCOMPLETE + BUGS !!
// 2020 07 27
function ct_popupbox(type,msg,script) {
    /*
        type: Type of popup; Can be Error (err), Warning (wrn) or Information (inf). PARSE AS STRING! "err","inf","wrn"
        msg: Message shown to user, parse as string.
        script: Script where this popup is running, will be shown to user. (parse as string)
    */

    switch(type){
        case 'err':
            var typereadable = "Error"; // type of popup as readable text, used in titlebar; "err" = "Error"
            var pubicon = 'status/16/error.png'; // Icon for popupbox movebar
            var headertext = "An error occoured at "; // Text for the header of the popup box
            break;
        case 'wrn':
            var typereadable = "Warning";
            var pubicon = 'status/16/important.png';
            var headertext = " sent a warning."
            break;
        case 'inf':
            var typereadable = "Information";
            var pubicon = 'status/16/info.png';
            var headertext = " sent information."
            break;
        default:
            ct_error("ctpopupbox typeswitch","type was not defined correctly",false); // happens when you dont enter options correctly
            return 1;
    }

    var dnctv_ctpopupbox = new cwindow('ctpopupbox', 50, 50, (ele)=>{
        var blines = [], // temp
            clines = [msg];
        var textSize = 13;
        var lineHeight = 16;
				
		clines.forEach((e,i)=>{
			wordWrap(e, dnctv_ctpopupbox.width / 7.2).split('\n').forEach((ee,ii)=>{
				blines.push(ee);
			});
		});
				
		blines.forEach((e,i)=>{
			mctx.fillStyle='#000';
			mctx.font = textSize+'px Open Sans';
			mctx.fillText(e, dnctv_ctpopupbox.x + 20 , dnctv_ctpopupbox.y + 50 + i*lineHeight);
		});
				
		var newHeight = textSize + 12 + blines.length * lineHeight;
		if(dnctv_ctpopupbox.minHeight <= newHeight)dnctv_ctpopupbox.height = newHeight
		else dnctv_ctpopupbox.height = dnctv_ctpopupbox.minHeight
    });

    // properties of titlebar of box
    dnctv_ctpopupbox.title = typereadable+" | CT Popup Box";
    dnctv_ctpopupbox.icon = pubicon;
    // Size of box
    dnctv_ctpopupbox.width = 500;
    dnctv_ctpopupbox.height = 250;
    // setting the location of the box to the center of the enviornment
    dnctv_ctpopupbox.x = msize.w / 2 - dnctv_ctpopupbox.width / 2;
    dnctv_ctpopupbox.y = msize.h / 2 - dnctv_ctpopupbox.height / 2;


    return 0;

}