var elementA = document.createElement('div'),
	elementB = document.createElement('div'),
	elementC = document.createElement('canvas');

hiddenContainer.appendChild(elementA);
elementA.appendChild(elementB);
elementA.appendChild(elementC);

/*var emulator = window.emulator = new V86Starter({
	memory_size: 32 * 1024 * 1024,
	vga_memory_size: 2 * 1024 * 1024,
	screen_container: elementA,
	bios: {
		url: 'https://sys32.dev/assets/v86/bios/seabios.bin',
	},
	vga_bios: {
		url: 'https://sys32.dev/assets/v86/bios/vgabios.bin',
	},
	cdrom: {
		url: 'https://sys32.dev/assets/v86/images/linux3.iso'
	},
	network_relay_url: 'wss://relay.widgetry.org/',
	autostart: false,
});*/

var initLinuxVM = (()=>{ // TODO: replace bios and linux images with blob urls
		var emulator = window.emulator = new V86Starter({
			memory_size: 128 * 1024 * 1024,
			vga_memory_size: 8 * 1024 * 1024,
			screen_container: elementA,
			
			initial_state: {
				url: 'https://sys32.dev/assets/v86/images/archState.bin',
				size: 142770436,
			},
			
			bios: {
				url: 'https://sys32.dev/assets/v86/bios/seabios.bin',
			},
			
			vga_bios: {
				url: 'https://sys32.dev/assets/v86/bios/vgabios.bin',
			},
			
			hda: {
				url: 'https://sys32.dev/assets/v86/images/archBruh.img',
				async: true,
				size: 10 * 1024 * 1024 * 1024,
			},
			
			/*filesystem: {
				baseurl: 'https://ldm.sys32.dev/arceh/',
				basefs: 'https://sys32.dev/assets/v86/images/fs.json',
				basesize: 10232633,
				size: 10232633,
			},*/
			
			filesystem: {
				/*basefs: {
					url: 'https://sys32.dev/assets/v86/images/archBruh.img',
					size: 10232633,
				},
				baseurl: 'https://ldm.sys32.dev/arceh/',*/
				baseurl: 'https://ldm.sys32.dev/arch/',
				basefs: 'https://sys32.dev/assets/v86/images/fs.json',
			},
			
			network_relay_url: 'wss://relay.widgetry.org/',
			
			autostart: true,
		});

		// emulator.run();
		
		var vmWindow = new cwindow('vm-linux', 50, 50, (ele)=>{
				if(!emulator.is_running()){
					mctx.textAlign = 'center';
					
					mctx.fillStyle = '#fff';
					mctx.font = '14px Inconsolata';
					
					mctx.fillText(`Arch Linux will load shortly...`, vmWindow.contentBox.x + vmWindow.contentBox.width / 2, vmWindow.contentBox.y + vmWindow.contentBox.height / 2 - 14);
					
					mctx.textAlign = 'start';
				}
				
				if(vmWindow.contentBox.hover){
					emulator.keyboard_set_status(true);
				}else{
					emulator.keyboard_set_status(false);
				}
				
				if(elementB.style.display != 'none'){ // text display
					var lines = Array.from(elementB.getElementsByTagName('div')),
						display = [];
					
					lines.forEach((e,i)=>{
						var line = '',
							pixels = Array.from(e.getElementsByTagName('span'));
						
						pixels.forEach((ee,ii)=>{
							line = line + ee.innerHTML;
						});
						
						display.push(line);
					});
					
					display.forEach((e,i)=>{
						mctx.fillStyle='#fff';
						mctx.font = textSize+'px Inconsolata';
						mctx.fillText(e, vmWindow.x + 15 , vmWindow.y + 50 + i*lineHeight);
					});
				}else{
					// elementC.width = vmWindow.contentBox.width
					// elementC.height = vmWindow.contentBox.height
					
					mctx.drawImage(elementC, vmWindow.contentBox.x, vmWindow.contentBox.y, vmWindow.contentBox.width, vmWindow.contentBox.height);
				}
			}),
			textSize = 14,
			lineHeight = 16;

		vmWindow.title = 'Linux emulator';
		vmWindow.width = 650;
		vmWindow.height = 430;
		vmWindow.bgColor = 'black'
		vmWindow.icon = 'apps/24/bash.png';
		vmWindow.cursor = {}
		vmWindow.cursor.hover = 'text'
		
		vmWindow.onclose = ()=>{
			emulator.stop();
		}
		
		emulator.add_listener('screen-set-size-graphical', (e)=>{
			console.log(e);
			vmWindow.width = e[0]
			vmWindow.height = e[1]	
			return e
		});
	});