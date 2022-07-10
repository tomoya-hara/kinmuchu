//Script.js

$(function () {
    showNow();
    fixed();
    setInterval('showNow()', 1000);
    //
    $('#salary').val(params.get('salary'))
    $('#payday').val(params.get('payday'))
    $('#alreadyHolidays').val(params.get('alreadyHolidays'))
    $('#yetHolidays').val(params.get('yetHolidays'))
    $('#jobStartHour').val(params.get('jobStartHour'))
    $('#jobStartMinute').val(params.get('jobStartMinute'))
    $('#jobEndHour').val(params.get('jobEndHour'))
    $('#jobEndMinute').val(params.get('jobEndMinute'))
    $('#breakStartHour').val(params.get('breakStartHour'))
    $('#breakStartMinute').val(params.get('breakStartMinute'))
    $('#breakEndHour').val(params.get('breakEndHour'))
    $('#breakEndMinute').val(params.get('breakEndMinute'))
});

function showNow(){
    var nowCal = new Date();
    var nowYear = nowCal.getFullYear();
    var nowMonth = nowCal.getMonth() + 1;
    var nowDay = nowCal.getDate();
    var nowHour = nowCal.getHours();
    var nowMinute = nowCal.getMinutes();
    var nowSecond = nowCal.getSeconds();
    var week = nowCal.getDay();
    var week_name = ["日曜日", "月曜日", "火曜日", "水曜日",
        "木曜日", "金曜日", "土曜日"];

    if(nowHour == breakStartHour && nowMinute == breakStartMinute){
        //System.out.print("\n\n休憩時間になりました！");
        run = false;
    }else if(nowHour == jobEndHour && nowMinute == jobEndMinute){
        //System.out.print("\n\n退勤時間になりました！");
        run = false;
    }
  
    $('#showNowMessage1_2').html(nowYear + '年' + nowMonth + '月' + nowDay + '日 ' + week_name[week]);
    $('#showNowMessage1_3').html(nowHour + "時" + nowMinute + "分" + nowSecond + "秒");
    timeUntilBreakStartTime(nowHour, nowMinute, nowSecond ,breakStartHour, breakStartMinute);
    timeUntilJobEndTime(nowHour, nowMinute, nowSecond ,jobEndHour, jobEndMinute);
    timeUntilPayday(daysUntilPayday, nowHour, nowMinute, nowSecond);
    todaysTotal += secondsSalaryRound;
    total += secondsSalaryRound;
    $('#showNowMessage2_2').html((Math.floor(todaysTotal * 100) / 100) + "円");
    $('#showNowMessage2_4').html((Math.floor(total * 100) / 100) + "円");
    $('#showNowMessage2_5').html("＋" + (Math.floor(secondsSalaryRound * 1000) / 1000) + "円/秒");

    const degH = nowHour * (360 / 12) + nowMinute * (360 / 12 / 60);
    const degM = nowMinute * (360 / 60);
    const degS = nowSecond * (360 / 60);
   
    // 各要素を取得
    const elementH = document.querySelector(".c-clock__hour");
    const elementM = document.querySelector(".c-clock__min");
    const elementS = document.querySelector(".c-clock__sec");
   
    // styleを追加
    elementH.style.transform = `rotate(${degH}deg)`;
    elementM.style.transform = `rotate(${degM}deg)`;
    elementS.style.transform = `rotate(${degS}deg)`;
}

function fixed(){
    $('#fixedMessage1_2').html((Math.floor(dailyWages * 100) / 100) + "円");
    $('#fixedMessage1_4').html((Math.floor(hourlyWage * 100) / 100) + "円");

if(day == payday){
    $('#fixedMessage1_5').html("本日は給料日です！");
    $('#fixedMessage1_6').html("口座を確認してみましょう");
}else {
    $('#fixedMessage1_5').html("前回の給料日からの経過日数");
    $('#fixedMessage1_6').html(daysFromLastPaydayToToday + "日");
}

$('#fixedMessage1_8').html(daysUntilPayday + "日");

if(day == payday){
    $('#fixedMessage1_9').html("今日から次の給料日までの勤務日数");
}else {
    $('#fixedMessage1_9').html("前回の給料日から<br>次の給料日までの勤務日数");
}
$('#fixedMessage1_10').html("計" + daysWorked + "日");

if(day != payday){
    $('#fixedMessage1_12').html(daysWorkedFromLastPaydayToToday + "日");
    $('#fixedMessage1_14').html(WorkingDaysFromTodayToNextPayday + "日");
}

$('#fixedMessage1_16').html((Math.floor(salaryToThePreviousDay * 10000) / 10000) + "円");
}

var params = (new URL(document.location)).searchParams;

//給料
var salary = params.get('salary');

//給料日
var payday = params.get('payday');

//仕事開始時間
var jobStartHour = params.get('jobStartHour');

//仕事開始分
var jobStartMinute = params.get('jobStartMinute');

//仕事終了時間
var jobEndHour = params.get('jobEndHour');

//仕事終了分
var jobEndMinute = params.get('jobEndMinute');

//休憩開始時間
var breakStartHour = params.get('breakStartHour');

//休憩開始分
var breakStartMinute = params.get('breakStartMinute');

//休憩終了時間
var breakEndHour = params.get('breakEndHour');

//休憩終了分
var breakEndMinute = params.get('breakEndMinute');

//休憩合計分
var breakTime = breakTimes(breakEndHour, breakStartHour, breakStartMinute, breakEndMinute);

//前回の給料日から次の給料日までの休日日数
var alreadyHolidays = params.get('alreadyHolidays');
var yetHolidays = params.get('yetHolidays');
var holidays = plusfunc(alreadyHolidays, yetHolidays);

//
var yobi = params.get('yobi');

var cal = new Date();
var year = cal.getFullYear();
var month = cal.getMonth() + 1;
var day = cal.getDate();
var hour = cal.getHours();
var minute = cal.getMinutes();
var second = cal.getSeconds();
var week = cal.getDay();
var week_name = ["日曜日", "月曜日", "火曜日", "水曜日",
        "木曜日", "金曜日", "土曜日"];

//今月の最終日取得
var date = new Date(year, month, 0);
var ldoftm = date.getDate();

//先月の最終日取得
var date = new Date(year, month - 1, 0);
var ldoflm = date.getDate();


//給料日までの残り日数
var daysUntilPayday = daysUntilPayday(ldoftm, day, payday);

//前回の給料日から今日までの日数
var daysFromLastPaydayToToday = daysFromLastPaydayToToday(ldoflm, day, payday);

//前回の給料日から今日までの勤務日数
var daysWorkedFromLastPaydayToToday = daysWorkedFromLastPaydayToToday(day, month, payday, ldoflm) - alreadyHolidays;

//前回の給料日から次の給料日までの勤務日数
var daysWorked = daysWorked(year, month, day, payday, ldoftm, ldoflm) - holidays;

//今日から次の給料日までの勤務日数
var WorkingDaysFromTodayToNextPayday = daysWorked - daysWorkedFromLastPaydayToToday;



//前日までの合計獲得金額
var salaryToThePreviousDay = (salary * daysWorkedFromLastPaydayToToday) / daysWorked;

//一日の合計勤務分
var jobHour = jobEndHour - jobStartHour;
var jobMinute = jobMinutes(jobHour, jobStartMinute, jobEndMinute, breakTime);
//一日の合計勤務秒
var jobSeconds = jobMinute * 60;

//今日の勤務秒
var todaysWorkingSeconds = todaysWorkingSecond(hour, minute, jobSeconds, jobStartHour, jobStartMinute, jobEndHour, jobEndMinute, breakStartHour, breakStartMinute, breakEndHour, breakEndMinute);

//前回の給料日から次の給料日までの秒数
var monthSeconds = daysWorked * jobMinute * 60; //変更予定

//日給
var dailyWages = salary / daysWorked;

//時給
var hourlyWage = dailyWages / jobMinute * 60; //変更予定

//型変換
var douSalary = salary;

//1秒あたりの獲得金額
var secondsSalaryRound = douSalary / monthSeconds;

//勤務時間かどうか
var runTime = workingTimeJudgment(hour, minute, jobStartHour, jobStartMinute, jobEndHour, jobEndMinute, breakStartHour, breakStartMinute, breakEndHour, breakEndMinute);

//勤務日かどうか
var runDay = workingDayJudgment(week);

var run = false;
if(runTime && runDay){
    run = true;
}

//本日の合計獲得金額
var todaysTotal = todaysWorkingSeconds * secondsSalaryRound;

//現在までの合計獲得金額
var total = salaryToThePreviousDay;
if(week != 0 && week != 6){
    total += (todaysTotal);
}

//二項の足し算関数
function plusfunc(a, b){
    return parseInt(a) + parseInt(b);
}

//一日の休憩時間
function breakTimes(breakEndHour, breakStartHour, breakStartMinute, breakEndMinute){
    return time = (breakEndHour - Number(breakStartHour)) * 60 - breakStartMinute + Number(breakEndMinute);
}

//一日の合計分
function jobMinutes(jobHour, jobStartMinute, jobEndMinute, breakTime){
    return time = (jobHour * 60) + Number(jobEndMinute) - Number(jobStartMinute) - Number(breakTime);
}

//給料日までの残り日数
function daysUntilPayday(ldoftm, day, payday){
if(day < payday){
    return payday - day;
}else{
    return ldoftm - day + payday;
}
}

//休憩までの残り時間
function timeUntilBreakStartTime(hour, minute, second , breakStartHour, breakStartMinute){
if(hour < breakStartHour || (hour == breakStartHour && minute <= breakStartMinute)){
    if(minute < breakStartMinute){
        $('#tubst2').html((breakStartHour - hour) + "時間" + (breakStartHour - 1 - minute) + "分" + (59 - second) + "秒");
    }else{
        $('#tubst2').html((breakStartHour - 1 - hour) + "時間" + (59 - minute + Number(breakStartMinute)) + "分" + (59 - second) + "秒");
    }
}else{
    $('#tubst2').html("---------");
}
}

//退勤までの残り時間
function timeUntilJobEndTime(hour, minute, second , jobEndHour, jobEndMinute){
if(minute < jobEndMinute){
    $('#tujet2').html((jobEndHour - hour) + "時間" + (jobEndMinute - 1 - minute) + "分" + (59 - second) + "秒");
}else{
    $('#tujet2').html((jobEndHour - 1 - hour) + "時間" + (59 - minute + Number(jobEndMinute)) + "分" + (59 - second) + "秒");
}
}

//給料日までの残り時間
function timeUntilPayday(day, hour, minute, second){
    $('#tupd2').html((day - 1) + "日" + (23 - hour) + "時間" + (59 - minute) + "分" + (59 - second) + "秒");
}

//前回の給料日から今日までの日数
function daysFromLastPaydayToToday(ldoflm, day, payday){
if(day < payday){
    return ldoflm - payday + day;
}else{
    return day - payday;
}
}

//勤務時間判定
function workingTimeJudgment(hour, minute, jobStartHour, jobStartMinute, jobEndHour, jobEndMinute,  breakStartHour, breakStartMinute, breakEndHour, breakEndMinute){
if(hour >= jobStartHour && hour <= jobEndHour){
    if(hour == jobStartHour && minute < jobStartMinute){
        $('#topMessage1_3').html("勤務開始前です");
        return false;
    }else if(hour == jobEndHour && minute >= jobEndMinute){
        $('#topMessage1_3').html("勤務終了後です");
        return false;
    }else if((hour == breakStartHour && minute >= breakStartMinute) || (hour == breakEndHour && minute < breakEndMinute)){
        $('#topMessage1_3').html("休憩時間です");
        return false;
    }else {
        return true;
    }
}else if(hour < jobStartHour){
    $('#topMessage1_3').html("勤務開始前です");
    return false;
}else if(hour > jobEndHour){
    $('#topMessage1_3').html("勤務終了後です");
    return false;
}else {
    return true;
}
}

//勤務日判定
function workingDayJudgment(week){
if(week == 0 || week == 6){
    return false;
}else {
    return true;
}
}

//今日の勤務時間秒を計算するメソッド
function  todaysWorkingSecond( hour, minute, jobSeconds, jobStartHour, jobStartMinute, jobEndHour, jobEndMinute, breakStartHour, breakStartMinute, breakEndHour, breakEndMinute){
var amSecond = ((breakStartHour - jobStartHour) * 60 - jobStartMinute + Number(breakStartMinute)) * 60;
var pmSecond = ((jobEndHour - breakEndHour) * 60 + Number(jobEndMinute) - breakEndMinute) * 60;
if(hour >= jobStartHour && hour <= jobEndHour){
    if(hour == jobStartHour && minute < jobStartMinute){
        return 0;
    }else if(hour == jobStartHour && minute >= jobStartMinute){
        return (minute - jobStartMinute) * 60;
    }else if(hour > jobStartHour && hour < breakStartHour){
        return ((hour - jobStartHour) * 60 + minute - jobStartMinute) * 60;
    }else if(hour == breakStartHour && minute < breakStartMinute){
        return ((breakStartHour - jobStartHour) * 60 + minute - jobStartMinute) * 60;
    }else if((hour == breakStartHour && minute >= breakStartMinute) || (hour == breakEndHour && minute < breakEndMinute)){
        return amSecond;
    }else if(hour == breakEndHour && minute >= breakEndMinute){
        return amSecond + minute * 60;
    }else if(hour > breakEndHour && hour < jobEndHour){
        return amSecond + ((hour - breakEndHour) * 60 + minute - breakEndMinute) * 60;
    }else if(hour == jobEndHour && minute < jobEndMinute){
        return amSecond + ((jobEndHour - breakEndHour) * 60 + minute - breakEndMinute) * 60;
    }else{
        return amSecond + pmSecond;
    }
}else if(hour < jobStartHour){
    return 0;
}else if(hour > jobEndHour){
    return amSecond + pmSecond;
}else{
    return 0;
}
}


//前回の給料日から次の給料日までの勤務日数
function daysWorked(year, month, day, payday, ldoftm, ldoflm){
var cal2 = new Date();
var count = 0;
var week = 0;
if(day < payday){
    for(var i = payday; i <= ldoflm; i++){
        var cal2 = new Date(year, month - 2, i);
        week = cal2.getDay();
        if(week != 0 && week != 6){
            count++;
        }
    }
    for(var i = 1; i < payday; i++){
        var cal2 = new Date(year, month - 1, i);
        week = cal2.getDay();
        if(week != 0 && week != 6){
            count++;
        }
    }
    return count;
}else {
    for(var i = payday; i <= ldoftm; i++){
        var cal2 = new Date(year, month - 1, i);
        week = cal2.getDay();
        if(week != 0 && week != 6){
            count++;
        }
    }
    for(var i = 1; i < payday; i++){
        var cal2 = new Date(year, month, i);
        week = cal2.getDay();
        if(week != 0 && week != 6){
            count++;
        }
    }
    return count;
}
}

//前回の給料日から今日までの勤務日数
function daysWorkedFromLastPaydayToToday(day, month, payday, ldoflm){
var cal2 = new Date();
var count = 0;
var week = 0;
if(day < payday){
    for(var i = payday; i <= ldoflm; i++){
        var cal2 = new Date(year, month - 2, i);
        week = cal2.getDay();
        if(week != 0 && week != 6){
            count++;
        }
    }
    for(var i = 1; i < day; i++){
        var cal2 = new Date(year, month - 1, i);
        week = cal2.getDay();
        if(week != 0 && week != 6){
            count++;
        }
    }
    return count;
}else {
    for(var i = payday; i < day; i++){
        var cal2 = new Date(year, month - 1, i);
        week = cal2.getDay();
        if(week != 0 && week != 6){
            count++;
        }
    }
    return count;
}
}