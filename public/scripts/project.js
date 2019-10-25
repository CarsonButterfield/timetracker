// global variable
var project;
var historyData = [];
var selectedDay;
var selectedTopic;

// TIMER START //

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
})
    .then(location.reload(false))
}
)

// Listen to input focus to togle alert class
$('#topic').on('focus', ()=>{
    $('#topic').attr('value', "")
    $('#topic').removeClass("alert");

})

// TIMER END //


const projectID = window.location.pathname.split('/')[2];
// console.log(projectID);

// SHow project details
const getProject = (id) => {
    // console.log({id})
    console.log(`api/v1/project/${id} is running`);
    fetch(`../api/v1/project/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(dataStream => dataStream.json())
      .then(res => {
        console.log({res});
        handleSuccess(res.data);
      })
      .catch(err => console.log(err));
}

const handleSuccess = (data) => {
    project = data;
    // data set
    console.log("project data:==>>>>");
    console.log(project);

    $('#project-head h2').text(data.projectName);
    $('#project-head p').text(data.companyName);
    $('#project-description').text(data.description);

    // data for table
    getHistoryData();

    // build a table
    buildTable();

    

}

getProject(projectID)

// data set
console.log("1 project data:==>>>>");
console.log(project);



//////////// Table /////////

const getHistoryData = ()=>{
    let workDays = [];
    project.workingTime.forEach((interval)=>{
        let day = new Date(interval.day).toLocaleDateString();
        workDays.push(day);
    });
    let uniqueWorkDays = [...new Set(workDays)];

    // combining data for each day if there are multiple records
    uniqueWorkDays.forEach((day)=>{
        let dayList = project.workingTime.filter(record=> new Date(record.day).toLocaleDateString() === day)
        // extract workin hours and summ them
        let workingTimeTotal = 0;
        let topicList = [];
        dayList.forEach((record) => {
            let startTime = new Date(record.startTime);
            let endTime = new Date(record.endTime);
            let workingTimeMinutes = Math.abs(Math.round((endTime - startTime)/(1000*60)));
            workingTimeTotal += workingTimeMinutes;
            topicList.push(record.projectTopic);
        })
        let uniqueTopics = [...new Set(topicList)];

        let dayObject = {
            day: day,
            workingTime: workingTimeTotal,
            topics: uniqueTopics,
        }

        historyData.push(dayObject);

    })

    const countMoney = ()=> {
        // cout everything in minutes
        let payRate = project.payRate/60;
        let extraHoursTime = project.extraHoursTime*60;
        let payRateExtra = project.extraHoursPayRate/60;

        historyData.forEach((day)=>{
            let money = 0;
            if (day.workingTime<=extraHoursTime){
                money = Math.round(day.workingTime*payRate);
            } else {
                money = Math.round(extraHoursTime*payRate + (day.workingTime - extraHoursTime)*payRateExtra);
            } 
            day.money = money;
        }); 
    }

    countMoney();
    console.log(historyData);

}

const buildTable = ()=>{
    console.log("building a table")
    $('tbody').empty();
    historyData.forEach((day)=> {
        let hours = Math.floor(day.workingTime/60);
        let minutes = day.workingTime - (Math.floor(day.workingTime/60)*60);
        let date = new Date(day.day).toDateString();
        let templ = `
            <tr>
                <td>${date}</td>
                <td>
                    <div class="topic inline-container">${day.topics.join(', ')}</div>
                    <div class="buttons">
                    <a id="edit-button" class="waves-effect waves-light btn edit-mode-button modal-trigger invisible" href="#modal-edit">edit</a>
                    <a id="delete-button" class="waves-effect waves-light btn edit-mode-button modal-trigger invisible" href="#modal-delete">delete</a>
                    <a id="cancel-button" class="waves-effect waves-light btn edit-mode-button invisible">cancel</a>
                    </div>
                </td>
                <td>${hours}:${minutes}</td>
                <td>${day.money}</td>
            </tr>
        `
        $('tbody').prepend(templ);
    })
}

const toggleEditMode = (event)=>{
    console.log("toggleEditMode()")
    console.log(event.target);
    console.log(event.target.parentNode.parentNode.parentNode);
    console.log(event.target.parentNode.parentNode.parentNode.tagName);
    console.log(event.target.parentNode.parentNode.parentNode.tagName === 'TR');

    if (event.target.parentNode.parentNode.parentNode.tagName === 'TR') {
        selectedDay = $(event.target.parentNode.parentNode.parentNode).find(">:first-child").text();
        selectedDay = new Date(selectedDay).toISOString();
        console.log("selectedDay: " + selectedDay);
        selectedTopic = $(event.target.parentNode.parentNode.parentNode).children().eq(1).children().eq(0).text();
        console.log("selectedTopic: " + selectedTopic);
        $('#topics').val(selectedTopic);


    }
    // selectedDay = new Date($(event.target.parentNode.parentNode.parentNode).find(">:first-child").text());
    // selectedDay = new Date(selectedDay).toISOString();
    // console.log("selectedDay: " + selectedDay);



    $(event.target.parentNode).toggleClass("half-invisible");
    $(event.target).find('#edit-button').toggleClass('invisible');
    $(event.target).find('#delete-button').toggleClass('invisible');
    $(event.target).find('#cancel-button').toggleClass('invisible');


}

const removeInvisible = ()=>{
    console.log("removeInvisible()")
    console.log(event.target);

    $("tr").removeClass("half-invisible");
    $(event.target.parentNode).find('#edit-button').toggleClass('invisible');
    $(event.target.parentNode).find('#delete-button').toggleClass('invisible');
    $(event.target.parentNode).find('#cancel-button').toggleClass('invisible');

}

// success function for day deleting
const handleSuccess3 = (data) => {
    console.log("day was deleted");
    location.reload(false);
    console.log("page was reloaded");
}


// remove the record for the day:
const deleteDayRecord = ()=> {
    console.log(`api/v1/remove/${projectID}/${selectedDay} is running`)
    fetch(`../api/v1/remove/${projectID}/${selectedDay}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {    
        'Content-Type': 'application/json',
      }
    })
      .then(dataStream => dataStream.json())
      .then(res => {
        console.log({res});
        handleSuccess3(res.data);
      })
      .catch(err => console.log(err));
}


const fillEditModal = ()=>{
  $('#topics').attr('value', selectedTopic);
    removeInvisible();
    console.log("topic was filled");

}

//Listen to click
$('tbody').on('click', 'tr', toggleEditMode);
// $('tbody').on('focusout', 'tr', function () {
//     $(this).removeClass('half-invisible');
//   });

// Listen to cancel button
$('tbody').on('click', '#cancel-button', removeInvisible);



// Modal listener
  $(document).ready(function(){
    $('.modal').modal();
  });

$('.datepicker').datepicker();
$('select').formSelect();


// Listen to DELETE button:
$('tbody').on('click', '#delete-button', removeInvisible);


// Listen to delete in Modal window:
$('#delete-confirmation').on('click', deleteDayRecord);


// Listen to Edit button:
$('tbody').on('click', '#edit-button', fillEditModal);





// Update record

const updateRecord = ()=> {
    event.preventDefault();
    console.log('Form was submitted');
}

// listen to submit edited record form
$('#edit-submit').on('click', updateRecord);