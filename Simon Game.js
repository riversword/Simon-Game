/*  Simon Game
*   by riversword - 2017
*/
$(document).ready(function(){
	var rul=[],btns=[0,1,2,3],checkIndex=0,level=0,power=false,strict=false;
	var timeLen=1000,num=0;
	var circlePlay;
	//var audio1=document.creatElement("audio");
	//audio1.src="sound/btn1.mp3";
	var audio1=new Audio("https://github.com/riversword/audio/raw/master/Button48.wav");
	/*audio1.addEventListener("canplaythrough",function(){
		console.log('audio1 is ready');
	},false);*/
	var audio2=new Audio("https://github.com/riversword/audio/raw/master/error1.mp3");
	/*audio1.addEventListener("canplaythrough",function(){
		console.log('audio2 is ready');
	},false);*/
	/*
	audio1.addEventListener('ended', function(){
	circlePlay=setInterval(function(){ audio1.play(); }, 0);
	}, false);*/
	function a1play(){
		audio1.play();
	}
	function a1stop(){
		audio1.currentTime=0;
		audio1.pause();
	}
	function a2play(){
		audio2.play();
	}
	function a2stop(){
		audio2.currentTime=0;
		audio2.pause();
	}
	function display(){
		$('.menu p').html(level);
		$('.cover1').removeClass('disappear');//显示遮罩层
		$('.cover2').removeClass('disappear');
		$('.cover3').removeClass('disappear');
		$('.cover4').removeClass('disappear');

		if(num==rul.length){
			//取消遮罩，用户可点击
			$('.cover1').addClass('disappear');
			$('.cover2').addClass('disappear');
			$('.cover3').addClass('disappear');
			$('.cover4').addClass('disappear');
			num=0;
		}else{
			//连续相同的btn时，亮-->暗 （间歇时间？0） 暗-->亮 （间歇时间？1000+timeLen） 亮-->暗
			$('div.buttons').eq(rul[num]).toggleClass('light',true,400);
			setTimeout(function(){a1play();},300);
			setTimeout(function(){a1stop();},800);
			setTimeout(function(){$('div.buttons').removeClass('light');},800);
			//$('div.buttons').eq(rul[num]).toggleClass('light',false,400);
			setTimeout(function(){display();},800+timeLen);//此处display()不放在function中会报错，display is not defined；
			num++;
		}
	}
	function nextLevel(){
			rul.push(Math.floor(Math.random()*4));
			level++;
	}
	
	//开机
	$('.power').click(function(){
		if(power){//关机
			//遮罩层
			$('.cover1').removeClass('disappear');
			$('.cover2').removeClass('disappear');
			$('.cover3').removeClass('disappear');
			$('.cover4').removeClass('disappear');
			//显示屏变暗，关机键变暗
			$('.menu p').removeClass('powerOn');
			$('.power').removeClass('powerOn');
			$('.controls button').removeClass('powerOn');
			$('div.box').removeClass('powerOn');
			$('.menu p').html('');
			//开始按钮状态初始化
			$('.controls button').eq(0).removeClass('disappear');
			$('.controls button').eq(1).addClass('disappear');
			//初始化严格模式
			$('.controls button').eq(2).removeClass('strictOn');
			strict=false;
			//清空数据
			rul=[],checkIndex=0,level=0,num=0,strict=false;

			power=false;
		}else{//开机
			//遮罩层消失
			$('.cover1').addClass('disappear');
			$('.cover2').addClass('disappear');
			$('.cover3').addClass('disappear');
			$('.cover4').addClass('disappear');
			//显示屏变亮，关机键变亮
			$('.menu p').addClass('powerOn');
			$('.power').addClass('powerOn');
			$('.controls button').addClass('powerOn');
			$('div.box').addClass('powerOn');
			power=true;
		}
	});

	$('.controls button').eq(0).click(function(){//game begin
		$('.controls button').eq(0).addClass('disappear');//隐藏start按钮
		$('.controls button').eq(1).removeClass('disappear');//显示restart按钮
		//第一次开始时才会用到start?
		nextLevel();
		display();
	});
	$('.controls button').eq(1).click(function(){//点击restart重新开始
		$('.controls button').eq(1).addClass('disappear');
		$('.controls button').eq(0).removeClass('disappear');
		rul=[],checkIndex=0,level=0,num=0;//初始化数据，保留严格模式的状态
		$('.menu p').html(level);
	});
	$('.controls button').eq(2).click(function(){//开启/关闭严格模式
		//
		if(strict){//关闭严格模式
			//
			$('.controls button').eq(2).removeClass('strictOn');
			strict=false;
		}else{//开启严格模式
			//
			$('.controls button').eq(2).addClass('strictOn');
			strict=true;
		}
	});
	$('div.buttons').mousedown(function(){
		$(this).addClass('light');
		a1play();
	});
	$('div.buttons').mouseup(function(){
		$(this).removeClass('light');
		//clearInterval(circlePlay);
		a1stop();
	});
	$('div.buttons').click(function(){
		if(rul.length!=0){//只有rul不为空时才进行验证
			if(parseInt(this.id)==rul[checkIndex]){
				if(checkIndex==rul.length-1){
					//遮罩层显示，play()函数中自带
					$('.menu p').html('good!');
					//setTimeout(function(){$('.controls p').html('next level');},500);
					checkIndex=0;
					nextLevel();
					if(level>20){
						$('.menu p').html('YOU WIN!(20)');
						//数据初始化，strict模式保持当前，start按钮也要初始化，点击色块 不会判断正误
						level=0,rul=[],checkIndex=0,num=0;
						$('.controls button').eq(0).removeClass('disappear');
						$('.controls button').eq(1).addClass('disappear');
					}
					setTimeout(function(){display();},1000);
				}else{
					checkIndex++;
				}
			}else{//执行错误函数
				$('.menu p').html('error');
				//*出现错误声音
				a2play();
				
				if(strict){
					//数据初始化，strict模式不变，出现start按钮
					level=0,rul=[],checkIndex=0,num=0;
					// $('.menu p').html(level);
					$('.controls button').eq(0).removeClass('disappear');
					$('.controls button').eq(1).addClass('disappear');
				}else{
					$('.cover1').removeClass('disappear');//显示遮罩层
					$('.cover2').removeClass('disappear');
					$('.cover3').removeClass('disappear');
					$('.cover4').removeClass('disappear');
					setTimeout(function(){display()},1500);
					checkIndex=0;
					num=0;
				}
		
			}
		}
	});
	
});