$(document).ready(function(){
	var rul=[],btns=[0,1,2,3],checkIndex=0,userAns=[],level=0;
	var timeLen=1000;
	var num=0,t;

	function display(){
		$('.controls p').html(level);
		$('.cover').removeClass('disappear');//显示遮罩层
		//有亮的就将其熄灭
		if($('div.buttons').hasClass('light')){
			$('div.buttons').removeClass('light');
		}
		//没有亮的就将第num个亮起
		if(num==rul.length){
			//stop
			$('.cover').addClass('disappear');
			num=0;
		}else{
			//连续相同的btn时，亮-->暗 （间歇时间？0） 暗-->亮 （间歇时间？1000+timeLen） 亮-->暗
			$('div.buttons').eq(rul[num]).addClass('light');
			t=setTimeout(function(){display();},1000+timeLen);//此处display()不放在function中会报错，display is not defined；
			num++;
		}
	}
	function nextLevel(){
			rul.push(Math.floor(Math.random()*4));
			level++;
	}

	$('.controls button').eq(0).click(function(){//game begin
		$('.controls button').eq(0).addClass('disappear');//隐藏start按钮
		$('.controls button').eq(1).removeClass('disappear');//显示restart按钮
		//第一次开始时才会用到start?
		level=0;
		nextLevel();
		display();
	
	});

	$('div.buttons').mousedown(function(){
		$(this).addClass('light');
	});
	$('div.buttons').mouseup(function(){
		$(this).removeClass('light');
	});
	$('div.buttons').click(function(){
		if(rul.length!=0){//只有rul不为空时才进行验证
			if(parseInt(this.id)==rul[checkIndex]){
				if(checkIndex==rul.length-1){
					//遮罩层显示，play()函数中自带
					checkIndex=0;
					nextLevel();
					setTimeout(function(){display();},1000);
				}else{
					checkIndex++;
				}
			}else{//执行错误函数
				$('.controls p').html('error');
				//*出现错误声音
				$('.cover').removeClass('disappear');//*遮罩层显示
				setTimeout(function(){display()},1000);
				checkIndex=0;
			}
		}
	});
	
});