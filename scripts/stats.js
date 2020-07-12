var initStats=(()=>{
	new cwin(moLs.length+1, 500 , 250, 'Stats', (ele)=>{ // info panel
		//console.log(ele);
		
		mctx.fillStyle='#000';
		mctx.font = "16px Arial";
		mctx.fillText(`URL: ${unescape(location.href)}`, ele.xpos + 10 , ele.ypos + 50 );
		mctx.fillText(`Platform: ${navigator.platform}`, ele.xpos + 10 , ele.ypos + 75 );
		
	}, (ele)=>{ // on closing
		
	}, msize.w/2, msize.h/2, 'img/info.png');
});

addDockIcon('img/info.png', 'System info', initStats);