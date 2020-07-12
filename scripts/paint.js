var initPaint=(()=>{
		var paintEle = null;
		var window=new cwin(moLs.length+1, 500 , 400, 'Paint', (ele)=>{ // on renderq called stuff
			paintEle = ele;
		}, (ele)=>{
			
		}, msize.w/15, msize.h/6, 'img/categories/graphics.png');
	});