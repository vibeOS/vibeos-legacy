var wallpapers={
		solids : [
			{
				name: 'Red',
				value: 'ff0000',
			},
			{
				name: 'Orange', // ct's favorite
				value: 'ffa500',
			},
			{
				name: 'Yellow',
				value: 'ffff00',
			},
			{
				name: 'Green',
				value: '008000',
			},
			{
				name: 'Blue',
				value: '0000ff',
			},
			{
				name: 'Purple',
				value: '800080',
			},
			{
				name: 'White',
				value: 'ffffff',
			},
			{
				name: 'Black',
				value: '000000',
			}
		],
		images : [
			{
				value: 'wallpapers/a.png',
				interactable: null,
				name: 'Wave',
			},
			{
				value: 'wallpapers/b.png',
				interactable: null,
				name: 'Default',
			},
			{
				value: 'wallpapers/c.png',
				interactable: null,
				name: 'Test Background',
			},
			{
				value: 'wallpapers/ct1.png',
				interactable: null,
				name: 'Garden Tiles (CT)',
			},
		],
	},
	initWallpaperPicker = ()=>{
		wallpapers.images.forEach(async(e,i)=>{
			e.interactable =  new interactable('desktop_contextBox_' + e.value.toLowerCase().trim(), 1920 / 15, 1080 / 15,
				emptyFunction,
				emptyFunction,
				()=>{
					// click start
					
					background.value = e.value;
				},
					
				()=>{
					// click end
					
				},
			);
			
			e.interactable.index = Object.entries(interactables).length
			e.image = new Image();
			e.image.src = 'tango/' + e.value
			
			e.imageDownscale = await downscale(e.image, 1920 / 15, 1080 / 15);
		});
		
		var window = new cwindow('wallpaper-picker', 50, 50, (ele)=>{
				// on render
				
				mctx.font = '13px Open Sans';
				mctx.fillStyle = '#000'
				
				mctx.fillText('Images:', ele.x + 20, ele.y + 50)
				
				wallpapers.images.forEach((e,i)=>{
					e.interactable.x = ele.x + 20 + i * (1920 / 15 + 20)
					e.interactable.y = ele.y + 60
					
					e.interactable.width = 1920 / 15
					e.interactable.height = 1080 / 15
					
					if(navigator.userAgent.match(/firefox\//gi)){ // on chrome, the downscale script will return undefined
						mctx.drawImageURL(e.imageDownscale, e.interactable.x, e.interactable.y, e.interactable.width, e.interactable.height);
					}else{
						mctx.drawImage(e.image, e.interactable.x, e.interactable.y, e.interactable.width, e.interactable.height);
					}
					
					mctx.lineJoin = 'miter';
					mctx.lineWidth = '2';
					
					if(e.interactable.hover){
						mctx.strokeStyle = '#fff'
						mctx.strokeRect(e.interactable.x - 2, e.interactable.y - 2, e.interactable.width + 4, e.interactable.height + 4)
					}
					
					if(e.value == background.value){
						mctx.strokeStyle = '#000'
						mctx.strokeRect(e.interactable.x - 2, e.interactable.y - 2, e.interactable.width + 4, e.interactable.height + 4)
					}
					
				});
			});
		
		window.closing = ()=>{
			wallpapers.images.forEach((e,i)=>{
				e.interactable.delete();
			});
		}
		
		window.title = 'Wallpaper Picker'
		window.icon = 'apps/24/preferences-desktop-wallpaper.png'
		window.width = 500
		window.height = 300
	}