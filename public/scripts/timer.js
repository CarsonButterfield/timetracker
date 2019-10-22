var digitSegments = [
    [1,2,3,4,5,6],
    [2,3],
    [1,2,7,5,4],
    [1,2,7,3,4],
    [6,7,2,3],
    [1,6,7,3,4],
    [1,6,5,4,3,7],
    [1,2,3], 
    [1,2,3,4,5,6,7],
    [1,2,7,3,6]
]


function startTimer() {
    console.log("Taimer is started");
  var _hours = document.querySelectorAll('.hours');
  var _minutes = document.querySelectorAll('.minutes');
  var time = new Date();
    time.setHours(0,0,0,0);
    var hours = time.getHours(), minutes = time.getMinutes();  
    var totalMinutes = 1;
    setNumber(_hours[0], 0, 1);
    setNumber(_hours[1], 0, 1);

    setNumber(_minutes[0], 0, 1);
    setNumber(_minutes[1], 0, 1);


  setInterval(function() {
      console.log("SetInterval");

    let hourFirstDidgit = (totalMinutes - (totalMinutes%60))/60%10;
    let hourSecondDidgit = ((totalMinutes - (totalMinutes%60))/60 - hourFirstDidgit)/10;
    let minutesFirstDighit = (totalMinutes%60)%10;
    let minutesSecondDighit = ((totalMinutes%60) - minutesFirstDighit)/10;
    setNumber(_hours[0], hourFirstDidgit, 1);
    setNumber(_hours[1], hourSecondDidgit, 1);
    setNumber(_minutes[0], minutesSecondDighit, 1);
    setNumber(_minutes[1], minutesFirstDighit, 1); 
    totalMinutes ++;
    
  }, 6000);
};

var setNumber = function(digit, number, on) {
  var segments = digit.querySelectorAll('.segment');
  var current = parseInt(digit.getAttribute('data-value'));


  // only switch if number has changed or wasn't set
  if (!isNaN(current) && current != number) {
    // unset previous number
    digitSegments[current].forEach(function(digitSegment, index) {
      setTimeout(function() {
        segments[digitSegment-1].classList.remove('on');
      }, index*45)
    });
  }
  
  if (isNaN(current) || current != number) {
    // set new number after
    setTimeout(function() {
      digitSegments[number].forEach(function(digitSegment, index) {
        setTimeout(function() {
          segments[digitSegment-1].classList.add('on');
        }, index*45)
      });
    }, 250);
    digit.setAttribute('data-value', number);
  }
}



// Listen to Start button: 
$('#start-time').on('click', ()=>{
    let $projectTopic = $('#topic').val();
    console.log($projectTopic);
    if($projectTopic !== '') {
        startTimer();
    } else {
        $('#topic').toggleClass("alert");
        $('#topic').attr('value', "Enter your project topic please")
    }
});


// Listen to input focus to togle alert class
$('#topic').on('focus', ()=>{
    $('#topic').attr('value', "")
    $('#topic').removeClass("alert");

})
