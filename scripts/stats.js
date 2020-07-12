var initStats=(()=>{
	new cwin(moLs.length+1, 500 , 250, 'Enviornment Information', (ele)=>{ // info panel
		//console.log(ele);
		
		mctx.fillStyle='#000';
		mctx.font = "16px Arial";
		mctx.fillText(`URL: ${unescape(location.href)}`, ele.xpos + 10 , ele.ypos + 50 ); // Line 1
		mctx.fillText(`Platform: ${navigator.platform}`, ele.xpos + 10 , ele.ypos + 75 ); // Line 2
		mctx.fillText(`User Agent: ${navigator.userAgent}`, ele.xpos + 10 , ele.ypos + 100 ); // Line 3; (ct: DIVIDE WRAP THIS!)
		mctx.fillText(`Screen Resolution: ${screen.width+"x"+screen.height}`, ele.xpos + 10 , ele.ypos + 125 ); // Line 4
		mctx.fillText(`Window Resolution: ${screen.availWidth+"x"+screen.availHeight}`, ele.xpos + 10 , ele.ypos + 150 ); // Line 5
		mctx.fillText(`Enviornment Resolution: ${msize.w+"x"+msize.h}`, ele.xpos + 10 , ele.ypos + 175 ); // line 6
		mctx.fillText(`IP Address: Not Available`, ele.xpos + 10 , ele.ypos + 200 ); // line 7; (ct: this needs to get working, unfortunately the implementation is dogshit so)

	}, (ele)=>{ // on closing
		
	}, msize.w/2, msize.h/2, 'img/info.png');
});

addDockIcon('img/info.png', 'System info', initStats);