var initStats=(async()=>{
	var ip=await request('https://api.ipify.org?format=json', 'GET');
	
	ip=await JSON.parse(ip.html).ip;
	
	new cwin(moLs.length+1, 500 , 400, 'Enviornment Information', async (ele)=>{ // called after rendering
		var lines=[],
			linesWrapped=[],
			writeLine=0;;
		
		mctx.fillStyle='#000';
		mctx.font = "16px Arial";
		
		lines.push(`URL: ${unescape(location.href)}`);
		lines.push(`Platform: ${navigator.platform}`);
		lines.push(`User Agent: ${navigator.userAgent}`); // Line 3; (ct: DIVIDE WRAP THIS!) div: OK
		lines.push(`Screen Resolution: ${screen.width+"x"+screen.height}`); // Line 4
		lines.push(`Window Resolution: ${screen.availWidth+"x"+screen.availHeight}`); // Line 5
		lines.push(`Enviornment Resolution: ${msize.w+"x"+msize.h}`); // line 6
		lines.push(`IP Address: ${ip}`); // line 7; (ct: this needs to get working, unfortunately the implementation is dogshit so)

		lines.forEach((e,i)=>{
			wordWrap(e, ele.width / 7).split('\n').forEach((ee,ii)=>{
				linesWrapped.push(ee);
			});
			linesWrapped.push('\n');
		});
		linesWrapped.forEach((e,i)=>{
			mctx.fillText(e, ele.xpos + 10 , ele.ypos + 50 + i*20);
		});

	}, (ele)=>{ // on closing
		
	}, msize.w/4, msize.h/2, 'img/info.png');
});

addDockIcon('img/info.png', 'System info', initStats);