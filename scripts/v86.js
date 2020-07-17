var decodeEntities = str=>{
	var element = document.createElement('div');
	if(!str || typeof str != 'string')return;
	
	// strip script/html tags

	str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
	str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
	element.innerHTML = str;
	str = element.textContent;
	element.textContent = '';

	return str;
}

var elementA = document.createElement('div'),
	elementB = document.createElement('div'),
	elementC = document.createElement('canvas'),
	emulator = {},
	vmWindow = {},
	loadMsg = 'Your VM will load shortly..',
	profileData = {
			memory_size: 128 * 1024 * 1024,
			vga_memory_size: 8 * 1024 * 1024,
			screen_container: elementA,
			
			/*initial_state: {
				// url: 'https://sys32.dev/assets/v86/images/archState.bin',
				url: 'https://sys32.dev/assets/v86/images/windows98_state.bin',
				size: 142770436,
			},*/
			
			bios: {
				url: 'https://sys32.dev/assets/v86/bios/seabios.bin',
			},
			
			vga_bios: {
				url: 'https://sys32.dev/assets/v86/bios/vgabios.bin',
			},
			
			/*hda: {
				// url: 'https://sys32.dev/assets/v86/images/archBruh.img',
				url: 'https://sys32.dev/assets/v86/images/windows98.img',
				async: true,
				size: 10 * 1024 * 1024 * 1024,
			},*/
			
			cdrom: {
				// url: 'https://sys32.dev/assets/v86/images/linux4.iso?wee',
				url: 'https://sys32.dev/assets/v86/images/warty-release-live-i386.iso',
			},
			
			/*filesystem: {
				baseurl: 'https://ldm.sys32.dev/arch/',
				basefs: 'https://sys32.dev/assets/v86/images/fs.json',
			},*/
			
			network_relay_url: 'wss://relay.widgetry.org/',
			
			autostart: true,
		},
		setVMProfile = (name)=>{
			emulator.stop();
			emulator.destroy();
			
			profileData.autostart = true
			
			emulator = new V86Starter(profileData);
			
			vmWindow.width = 650;
			vmWindow.height = 460;
			
			emulator.add_listener('screen-set-size-graphical', (e)=>{
				// console.log(e);
				if(e[0] > 650)vmWindow.width = e[0]
				if(e[1] > 460)vmWindow.height = e[1] + 35
				return e
			});	
			
			// emulator.run();
			
			loadMsg = ('Your VM, '+name+', will load shortly..');
			
			window.addEventListener('load', ()=>{
				emulator.run();
			});
		};

hiddenContainer.appendChild(elementA);
elementA.appendChild(elementB);
elementA.appendChild(elementC);

var initLinuxVM = (()=>{
		emulator = new V86Starter(profileData);

		// emulator.run();
		
		var wino = new windowOptions([
			{
				value: 'VM',
				contents: [
					{
						value: 'Run',
						func: ()=>{
							emulator.run();
						},
					},
					{
						value: 'Stop',
						func: ()=>{
							emulator.stop();
						},
					},
					
				]
			},
			{
				value: 'Profiles',
				contents: [
					{
						value: 'Arch Linux',
						func: ()=>{
							profileData.initial_state = {
								url: 'https://sys32.dev/assets/v86/images/archState.bin',
								size: 142770436,
							}
							profileData.hda = {
								url: 'https://sys32.dev/assets/v86/images/archBruh.img',
								async: true,
								size: 10 * 1024 * 1024 * 1024,
							}
							profileData.filesystem = {
								baseurl: 'https://ldm.sys32.dev/arch/',
								basefs: 'https://sys32.dev/assets/v86/images/fs.json',
							}
							profileData.cdrom = null
							
							setVMProfile('Arch Linux');
						},
					},
					{
						value: 'Linux 3',
						func: ()=>{
							profileData.initial_state = null
							profileData.hda = null
							profileData.filesystem = null
							profileData.cdrom = {
								url: 'https://sys32.dev/assets/v86/images/linux3.iso',
							}
							
							profileData.autostart = true
							
							setVMProfile('Linux 3');
						},
					},
					{
						value: 'Linux 4',
						func: ()=>{
							profileData.initial_state = null
							profileData.hda = null
							profileData.filesystem = null
							profileData.cdrom = {
								url: 'https://sys32.dev/assets/v86/images/linux4.iso',
							}
							
							setVMProfile('Linux 4')
						},
					},
					{
						value: 'Ubuntu 4.10',
						func: ()=>{
							profileData.initial_state = null
							profileData.hda = null
							profileData.filesystem = null
							profileData.cdrom = {
								url: 'https://sys32.dev/assets/v86/images/warty-release-live-i386.iso',
							}
							
							setVMProfile('Ubuntu 4.10')
						},
					},
					{
						value: 'Kolibri 0.7.7.0',
						func: ()=>{
							profileData.initial_state = null
							profileData.hda = null
							profileData.filesystem = null
							profileData.cdrom = {
								url: 'https://sys32.dev/assets/v86/images/kolibri.iso',
							}
							
							setVMProfile('Kolibri 0.7.7.0')
						},
					},
					{
						value: 'MS-DOS',
						func: ()=>{
							profileData.initial_state = null
							profileData.cdrom = null
							profileData.hda = null
							profileData.filesystem = null
							profileData.fda = {
								url: 'https://sys32.dev/assets/v86/images/msdos.img',
							}
							
							setVMProfile('MS-DOS');
						},
					},
					{
						value: 'Windows 98',
						func: ()=>{
							profileData.initial_state = {
								url: 'https://sys32.dev/assets/v86/images/windows98_state.bin',
								size: 142770436,
							}
							profileData.hda = {
								url: 'https://sys32.dev/assets/v86/images/windows98.img',
								async: true,
								size: 10 * 1024 * 1024 * 1024,
							}
							profileData.filesystem = null
							profileData.cdrom = null
							
							setVMProfile('Windows 98');
						},
					},
				]
			},
		]),
			textSize = 14,
			lineHeight = 16;

		vmWindow = new cwindow('vm-linux', 50, 50, (window)=>{
			if(!emulator.is_running()){
				mctx.textAlign = 'center';
				
				mctx.fillStyle = '#fff';
				mctx.font = '14px Inconsolata';
				
				mctx.fillText(loadMsg, vmWindow.contentBox.x + vmWindow.contentBox.width / 2, vmWindow.contentBox.y + vmWindow.contentBox.height / 2 - 14);
				
				mctx.textAlign = 'start';
			}else if(emulator.is_running()){
					if(vmWindow.contentBox.hover){
						emulator.keyboard_set_status(true);
						// emulator.mouse_set_status(true);
					}else{
						emulator.keyboard_set_status(false);
						
						// emulator.mouse_set_status(false);
					}
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
					
					line = decodeEntities(line);
					
					if(typeof line != 'undefined' && line != null)display.push(line);
				});
				
				display.forEach((e,i)=>{
					mctx.fillStyle='#fff';
					mctx.font = textSize+'px Inconsolata';
					mctx.fillText(e, vmWindow.x + 15 , vmWindow.y + 75 + i*lineHeight);
				});
			}else{
				// elementC.width = vmWindow.contentBox.width
				// elementC.height = vmWindow.contentBox.height
				
				mctx.drawImage(elementC, vmWindow.contentBox.x, vmWindow.y + 55, elementC.width, elementC.height);
			}
			
			wino.render(window);
			wino.interactable.index = 30
		});
		
		vmWindow.title = 'Emulator';
		vmWindow.width = 650;
		vmWindow.height = 460;
		vmWindow.bgColor = 'black'
		vmWindow.icon = 'apps/24/bash.png';
		vmWindow.cursor = {}
		vmWindow.cursor.hover = 'text'
		
		vmWindow.onclose = ()=>{
			emulator.stop();
		}
		
		mCanvas.addEventListener('click', ()=>{
			if(vmWindow.contentBox.hover)mCanvas.requestPointerLock();
		});
	});