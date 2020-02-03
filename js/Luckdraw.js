var nametxt = $('.slot');
var phonetxt = $('.name');
var pcount = data.person.length - 1; // 参加人数
var runing = true;
var trigger = true;
var inUser = (Math.floor(Math.random() * 10000)) % 5 + 1;
var num = 0;
var Lotterynumber; //设置单次抽奖人数

$(document).ready(function () {   
    var myVideo = document.getElementById("myaudio");
    var idPlaymusic = false;
    var personMin = 1;
    var personMax = 10;

    // 设置默认的中奖人数(为1)   
    changeLotternumber(1);

    // 设置中奖人数
    $("#lotterynumber").change(function () {
        changeLotternumber($(this).val()); 
    });
    // 人数减1
    $("#lot_minus").click(function () {
        if ($("#lotterynumber").val() > personMin) {
            changeLotternumber(parseInt( $("#lotterynumber").val()) - 1);
        }
    });
    // 人数加1
    $("#lot_plus").click(function () {
        if ($("#lotterynumber").val() < personMax) {
            changeLotternumber(parseInt( $("#lotterynumber").val()) + 1);
        }
    });

   
    //音乐
    $("#span_music").click(function () {       
        //播放隐藏音乐切换
        $(this).children("i").eq(0).toggleClass("fa-spin");
        $(this).children("i").eq(1).toggle();
        if (idPlaymusic) {
            myVideo.pause();
            idPlaymusic = false;
        } else {
            myVideo.play();
            idPlaymusic = true;
        }
    });  
   
});

var h_time;
$(function () {
    // 照片加载 
    changeDateMain();
    //循环移动照片
    h_time = window.setInterval(h_top, 100);
});

// 开始停止
function start() {
	if (runing) {
        if (pcount < Lotterynumber) {
            alert("抽奖人数不足" + Lotterynumber +"人");
		}else{
            runing = false;
            //清除参与列表的人
            $(".luck-user-list").empty();
            $('#start').text('停止');
            //将动画旋转时间设定为1s
            $(".slot").css("animation-duration", "1s");
            startNum();
        }

    } else {        
		$('#start').text('自动抽取中('+ Lotterynumber+')');
        zd();        
	}   
}

// 开始抽奖

function startLuck() {
	runing = false;
	$('#btntxt').removeClass('start').addClass('stop');
    startNum();
}

// 循环参加名单
function startNum() {
    num = Math.floor(Math.random() * pcount);    
	t = setTimeout(startNum, 0);
}

// 停止跳动
function stop() {
    pcount = data.person.length - 1;
	clearInterval(t);
	t = 0;
}

// 打印中奖人
function zd() {
    if (trigger) {        
		trigger = false;
        var i = 0;
        var counts = Lotterynumber;         //用于抽奖的人数

        if (pcount >= Lotterynumber) {
            // 每秒一次，进行抽奖
			stopTime = window.setInterval(function () {
				if (runing) {
					runing = false;
					$('#btntxt').removeClass('start').addClass('stop');
					startNum();
                }
                else {
					runing = true;
					$('#btntxt').removeClass('stop').addClass('start');
					stop();
                    //将动画旋转时间设定为1s                   
                    i++;
                    counts --;
                   
                    $('#start').text('自动抽取中(' + counts + ')');
                   
                    //打印中奖者名单
                    $('.luck-user-list').prepend("<li><div class='portrait' style='background-image:url(" + data.person[num].imgUrl + ")'></div><div class='luckuserName'>" + data.person[num]["name "] + "</div></li>");
                    $('.modality-list ul').append("<li><div class='luck-img' style='background-image:url(" + data.person[num].imgUrl + ")'></div><p>" + data.person[num]["name "]+"</p></li>");
                    //将已中奖者从数组中"删除",防止二次中奖
                    data.person.splice(num, 1);       
                    //屏幕显示剩余人员
                    changeDateMain();
                    // 滚动频率设定为1s
                    $(".slot").css("animation-duration", "1s");
                    if (i == Lotterynumber) {
                        console.log("抽奖结束");
                        window.clearInterval(stopTime);
                        $('#start').text("开始");
                        trigger = true;
                        //抽奖结束，时间设定为20s
                        $(".slot").css("animation-duration", "20s");
                    };
				}
			},1000);
		};
	}
}

//修改range值
function changeLotternumber(values) {
    $("#lot_value").html(values);
    $("#lotterynumber").val(values);
    this.Lotterynumber = $("#lotterynumber").val();    
}
// 修改屏幕显示抽奖人员
function changeDateMain() {
    $("#luckuser").empty();
    for (var i = 0; i < data.person.length; i++) {
        var myrow = parseInt(i / 7);
        $("#luckuser").append('<div class="slot row' + myrow + '" style="background-image:url(' + data.person[i].imgUrl + ')"><span class= "name" >' + data.person[i]["name "] +'</span ></div >');     
               
    }
}

//循环移动照片
function h_top() {    
    var slot = $(".slot");
    for (var i = 0; i < slot.length; i++) {
        var top = slot.eq(i).position().top;
        if (top >= -150) {
            slot.eq(i).css('top', (top - 1) + "px");
        } else {
            slot.eq(i).css('top',"700px");
        }
    }    
}