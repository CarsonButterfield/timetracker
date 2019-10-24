/* 
var timeStampId;
var stop = false;
var totalMinutes = 1;

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
  console.log("Timer has started");
  var _hours = document.querySelectorAll('.hours');
  var _minutes = document.querySelectorAll('.minutes');  
  setNumber(_hours[0], 0, 1);
  setNumber(_hours[1], 0, 1);
  setNumber(_minutes[0], 0, 1);
  setNumber(_minutes[1], 0, 1);

  function updateTime() {
    const everyMinute = setInterval(()=>{
      if (stop === false){
        console.log("updating timer");
        let hourFirstDidgit = (totalMinutes - (totalMinutes%60))/60%10;
        let hourSecondDidgit = ((totalMinutes - (totalMinutes%60))/60 - hourFirstDidgit)/10;
        let minutesFirstDighit = (totalMinutes%60)%10;
        let minutesSecondDighit = ((totalMinutes%60) - minutesFirstDighit)/10;
        setNumber(_hours[0], hourFirstDidgit, 1);
        setNumber(_hours[1], hourSecondDidgit, 1);
        setNumber(_minutes[0], minutesSecondDighit, 1);
        setNumber(_minutes[1], minutesFirstDighit, 1); 
        totalMinutes ++;
      } else {
        console.log("clearing interval");
        clearInterval(everyMinute);
      }
    }, 6000)
  }
  updateTime();

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


// for StartTime
const onSuccess = (res) => {
  console.log(res);
  timeStampId = res.data._id;
  startTimer();
}

const onError = (err) => {
  console.log(err)
}

// for StopTime
const onSuccess2 = (res) => {
  console.log(res);
  console.log("Stop Timer");
}


// Listen to Start button: 
$('#start-time').on('click', ()=>{
    stop = false;
    totalMinutes = 1;
    let $projectTopic = $('#topic').val();
    // if projectTopic field is not empty
    if($projectTopic !== '') {

      // create timeStamp object in DB
      event.preventDefault()
 
      let timeObject = {
        "startTime" : new Date().toLocaleString(),
        "endTime": new Date().toLocaleString(),
        "day": new Date().toLocaleDateString(),
        "projectTopic": $projectTopic
      }

      // get projectID from url
      const projectID = window.location.pathname.split('/')[2];

      $.ajax({
        xhrFields: {
            withCredentials: true
         },
        url: `/api/v1/startTime/${projectID}`,
        method: 'POST',
        data: timeObject,
        success: onSuccess,
        error: onError
    })
      
    } else {
        $('#topic').toggleClass("alert");
        $('#topic').attr('value', "Enter your project topic please")
    }
});


// Listen to STOP button
$('#stop-time').on('click', ()=>{
  stop = true;
  $('.segment').removeClass('on');
  $('.digit').removeAttr('data-value');
  $.ajax({
    xhrFields: {
        withCredentials: true
     },
    url: `/api/v1/stopTime/${projectID}/${timeStampId}/`,
    method: 'PUT',
    success: onSuccess2,
    error: onError
}).then(projectModule.buildTable())
}
)

// Listen to input focus to togle alert class
$('#topic').on('focus', ()=>{
    $('#topic').attr('value', "")
    $('#topic').removeClass("alert");

})


 */