/*  Simon Game
*   design and code by riversword - 2017
*/
$(document).ready(function(){
	var rul=[],
	btns=[0,1,2,3],
	checkIndex=0,
	level=0,
	power=false,
	strict=false,
	timeLen=1000,
	num=0,
	circlePlay;

	var audio1=new Audio("https://github.com/riversword/audio/raw/master/Button48.wav"),
	    audio2=new Audio("https://github.com/riversword/audio/raw/master/error1.mp3");
	
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
		$('.cover1').removeClass('disappear');//to stop click
		$('.cover2').removeClass('disappear');
		$('.cover3').removeClass('disappear');
		$('.cover4').removeClass('disappear');

		if(num==rul.length){
			//allow to click
			$('.cover1').addClass('disappear');
			$('.cover2').addClass('disappear');
			$('.cover3').addClass('disappear');
			$('.cover4').addClass('disappear');
			num=0;
		}else{
			$('div.buttons').eq(rul[num]).toggleClass('light',true,400);
			setTimeout(function(){a1play();},300);
			setTimeout(function(){a1stop();},800);
			setTimeout(function(){$('div.buttons').removeClass('light');},800);
			setTimeout(function(){display();},800+timeLen);
			num++;
		}
	}
	function nextLevel(){
			rul.push(Math.floor(Math.random()*4));
			level++;
	}
	
	$('.power').click(function(){
		if(power){//turn power to off, stop click
			$('.cover1').removeClass('disappear');
			$('.cover2').removeClass('disappear');
			$('.cover3').removeClass('disappear');
			$('.cover4').removeClass('disappear');
			
			$('.menu p').removeClass('powerOn');
			$('.power').removeClass('powerOn');
			$('.controls button').removeClass('powerOn');
			$('div.box').removeClass('powerOn');
			$('.menu p').html('');
			
			$('.controls button').eq(0).removeClass('disappear');
			$('.controls button').eq(1).addClass('disappear');
			
			$('.controls button').eq(2).removeClass('strictOn');
			strict=false;
			//clear the records
			rul=[],checkIndex=0,level=0,num=0,strict=false;

			power=false;
		}else{//turn power to on, allow to click
			
			$('.cover1').addClass('disappear');
			$('.cover2').addClass('disappear');
			$('.cover3').addClass('disappear');
			$('.cover4').addClass('disappear');
			
			$('.menu p').addClass('powerOn');
			$('.power').addClass('powerOn');
			$('.controls button').addClass('powerOn');
			$('div.box').addClass('powerOn');
			power=true;
		}
	});

	$('.controls button').eq(0).click(function(){//game begin
		$('.controls button').eq(0).addClass('disappear');//hide "start" button
		$('.controls button').eq(1).removeClass('disappear');//show "restart" button
		
		nextLevel();
		display();
	});

	$('.controls button').eq(1).click(function(){//click "restart" button
		$('.controls button').eq(1).addClass('disappear');
		$('.controls button').eq(0).removeClass('disappear');
		rul=[],checkIndex=0,level=0,num=0;//clear the data, keep the state of "strict"
		$('.menu p').html(level);
	});

	$('.controls button').eq(2).click(function(){//open/close "strict" model
		
		if(strict){
			//close "strict" model
			$('.controls button').eq(2).removeClass('strictOn');
			strict=false;
		}else{
			//open "strict" model
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
		a1stop();
	});
	$('div.buttons').click(function(){
		if(rul.length!=0){ //check the answer only when game has started
			if(parseInt(this.id)==rul[checkIndex]){
				if(checkIndex==rul.length-1){
					
					$('.menu p').html('good!');
					checkIndex=0;
					nextLevel();
					if(level>20){
						$('.menu p').html('YOU WIN!(20)');
						//clear the data
						level=0,rul=[],checkIndex=0,num=0;
						$('.controls button').eq(0).removeClass('disappear');
						$('.controls button').eq(1).addClass('disappear');
					}
					setTimeout(function(){display();},1000);
				}else{
					checkIndex++;
				}
			}else{
				$('.menu p').html('error');
				//play error audio
				a2play();
				
				if(strict){
					//in "strict" model, when answer is not correct ,go back to level 0
					level=0,rul=[],checkIndex=0,num=0;
					$('.controls button').eq(0).removeClass('disappear');
					$('.controls button').eq(1).addClass('disappear');
				}else{
					//stop click and show the correct answer
					$('.cover1').removeClass('disappear');
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