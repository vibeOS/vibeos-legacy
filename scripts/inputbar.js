class inputbar {
	constructor(zindex, x, y, width, height, placeholder, onChange, onSubmit){
		this.zindex = this.eleID = Number(zindex);
		
		this.blinkStr = '';
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.value = '';
		this.preValue = '';
		this.valueBar = new cele(this.zindex, this.x, this.y, this.width, this.height, null, {pressed : 'text', hover : 'text'});
		
		setInterval(()=>{
			var ele=moLs[this.eleID];
			
			if(typeof ele == 'undefined')return;
			
			if(ele.focused){
				if(this.blinkStr=='')this.blinkStr='|'
				else this.blinkStr='';
			}else{
				this.blinkStr='';
			}
			
		}, 1000);
		
		this.setPos = (x,y)=>{
			var ele=moLs[this.eleID];
			this.x = x;
			this.y = y;
			moLs[this.zindex].xpos = x;
			moLs[this.zindex].ypos = y;
			
			moLs[this.zindex].width = this.width;
			moLs[this.zindex].height = this.height;
			
			this.valueBar.x = x;
			this.valueBar.y = y;
			
		}
		
		if(placeholder != null)this.placeholder = placeholder
		else this.placeholder = 'Text'
		
		mCanvas.addEventListener('paste', e=>{
			var paste = (event.clipboardData || window.clipboardData).getData('text');
			this.value += paste;
		});
		
		mCanvas.addEventListener('keydown', e=>{
			var ele=moLs[this.eleID];
			
			if(!ele.focused)return;
			switch(e.keyCode){
				case 8: // backspace
					this.value = this.value.substr(0,this.value.length-1);
					break
				case 38: // up arrow
					this.value=this.preValue;
					break
				case 16: case 20:case 36:case 144:case 93:case 17:case 27:case 9:case 91:case 18:case 46:case 35:case 34:case 45:case 33:case 40:case 39:case 37:
					break
				case 13: // enter key
					
					onSubmit(this.value); // run callback stuff before clearing
					
					this.preValue=this.value; // set previous value for uparrow presses
					
					this.value='';
					
					break
				default:
					this.value=this.value+e.key;
					
					onChange(e.key, this.value);
					
					break
			}
		});
		renderQ[this.eleID]=(()=>{
			var ele=moLs[this.eleID];
			
			// if(typeof ele == 'undefined' || typeof winBar == 'undefined' || winBar == null)return renderQ[this.eleID] = ()=>{};
			
			if(ele.focused){
				mctx.fillStyle='#fff';
			}else if(ele.hover){
				mctx.fillStyle='#bdbdbd';
			}else{
				mctx.fillStyle='#8a8a8a';
			}
			
			mctx.fillRect(this.x, this.y, this.width, this.height);
			
			mctx.fillStyle='#000';
			mctx.fillRect(this.x+2, this.y+2, this.width-4, this.height-4);
			
			mctx.fillStyle='#000';
			mctx.font = "16px Roboto";
			mctx.fillText(this.placeholder, this.xpos + 3 , this.ypos - 20 );
			
			mctx.fillStyle='#fff';
			mctx.font = "14px Roboto";
			
			if(this.value.length <= 0 && ele.focused==true){
				mctx.fillStyle='#8c8c8c';
				mctx.fillText(this.blinkStr, this.x + 10 , this.y +  this.height/2 + 5 );
			}else if(this.value.length <= 0){
				mctx.fillStyle='#8c8c8c';
				mctx.fillText('https://example.org', this.x + 10 , this.y +  this.height/2 + 5 );
			}else{
				mctx.fillText(this.value+this.blinkStr, this.x + 10 , this.y +  this.height/2 + 5 );
			}
			
		});
	}
}