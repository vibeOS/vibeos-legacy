/*
    ctaetcsh's Personal Script
    For questions, please ask me in Discord

    DO NOT MODIFY WITHOUT PRIOR NOTICE & PERMISSION
    This script is backed up as it is updated.

    Last updated: August 3, 2020
*/

// Random
var ok = 'ok';
console.log("Loaded ct.js");

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

// Function to get a url to a cat (along with other data).
// Run this function and it will set the values of the object ct_getcat_return.
// In this varible contains .url, which is the image url; .id, which is the
// image ID from The Cat API; as well as .height and .width, for, you know.
// 2020 08 03
function ct_getcat() {
    let ctgc_headers = new Headers({
        'x-api-key': '2b032810-c828-48e7-8c8c-c7a83907e312',
    });
    let ctgc_request = new Request('https://api.thecatapi.com/v1/images/search', {
        method: 'GET',
        headers: ctgc_headers,
        mode: 'cors',
        cache: 'default',
    });
    fetch(ctgc_request)
        .then(function (response) {return response.json()})
        .then(json => {
            ct_getcat_return = json[0];
        })
}


// [BROKEN] Function to import and apply profile data
// not done yet, maybe some of you can figure this shit out cause i cant
// 2020 07 18
function ct_importprofile() {
    fetch('https://hastebin.com/raw/mojohavode') // testing json
        .then(response => response.json())
        .then(data => console.log(data))
}



// CT PopupBox Testing function.
function ctt_popupbox() {ct_popupbox("err","Test popup box. The quick brown fox jumps over the lazy dog. Something something that is really long. Sprinkles on kittens and raindrops on noses something idk. Test popup box. The quick brown fox jumps over the lazy dog. Something something that is really long. Sprinkles on kittens and raindrops on noses something idk. Test popup box. The quick brown fox jumps over the lazy dog. Something something that is really long. Sprinkles on kittens and raindrops on noses something idk.")};

// Function to show a popup box to the user.
// Must be completed by PrB2, almost to a working state.
// 2020 08 03
function ct_popupbox(type,l1,l2,l3) {
    /*
        type: Type of popup; Can be Error (err), Warning (wrn) or Information (inf). PARSE AS STRING! "err","inf","wrn"
        msg: Message shown to user, parse as string.
    */

    switch(type){
        case 'err':
            var typereadable = "Error"; // type of popup as readable text, used in titlebar; "err" = "Error"
            var pubicon = 'status/16/error.png'; // Icon for popupbox movebar
            break;
        case 'wrn':
            var typereadable = "Warning";
            var pubicon = 'status/16/important.png';
            break;
        case 'inf':
            var typereadable = "Information";
            var pubicon = 'status/16/info.png';
            break;
        default:
            console.error("Did not parse type of popupbox correctly when called!"); // happens when you dont enter options correctly
            return 1;
    }

    var dnctv_ctpopupbox = new cwindow('ctpopupbox', 50, 50, (ele)=>{
        var blines = [], // temp
            clines = [l1,l2,l3];
        var textSize = 16;
        var lineHeight = 18;
				
		clines.forEach((e,i)=>{
			wordWrap(e, dnctv_ctpopupbox.width / 7.2).split('\n').forEach((ee,ii)=>{
				blines.push(ee);
			});
		});
				
		blines.forEach((e,i)=>{
			mctx.fillStyle='#000';
			mctx.font = textSize+'px Open Sans';
			mctx.fillText(e, dnctv_ctpopupbox.x + 20 , dnctv_ctpopupbox.y + 60 + i*lineHeight);
		});
				
		var newHeight = textSize + 12 + blines.length * lineHeight;
		if(dnctv_ctpopupbox.minHeight <= newHeight)dnctv_ctpopupbox.height = newHeight
		else dnctv_ctpopupbox.height = dnctv_ctpopupbox.minHeight
    });

    // properties of titlebar of box
    dnctv_ctpopupbox.title = typereadable+" | CT PopupBox";
    dnctv_ctpopupbox.icon = pubicon;
    // Size of box
    dnctv_ctpopupbox.width = 400;
    dnctv_ctpopupbox.minHeight = 100;
    // setting the location of the box to the center of the enviornment
    dnctv_ctpopupbox.x = msize.w / 2 - dnctv_ctpopupbox.width / 2;
    dnctv_ctpopupbox.y = msize.h / 2 - dnctv_ctpopupbox.height / 2;


    return 0;

}