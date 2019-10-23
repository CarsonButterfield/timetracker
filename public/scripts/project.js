// global variable
var project;
var historyData = [];


const projectID = window.location.pathname.split('/')[2];
// console.log(projectID);

// SHow project details
const getProject = (id) => {
    // console.log({id})
    console.log(`api/v1/project/${id} is running`)
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

    // console.log(data);
    // console.log(data.projectName);
    // console.log($('#project-head h2'));
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

        let dayObject = {
            day: day,
            workingTime: workingTimeTotal,
            topics: topicList,
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
    historyData.forEach((day)=>{
        let hours = Math.floor(day.workingTime/60);
        let minutes = day.workingTime - (Math.floor(day.workingTime/60)*60);
        let date = new Date(day.day).toDateString();
        let templ = `
            <tr>
                <td>${date}</td>
                <td>${day.topics.join(', ')}
                    <div class="buttons">
                        <a id="edit-button" class="waves-effect waves-light btn edit-mode-button invisible">edit</a>
                        <a id="delete-button" class="waves-effect waves-light btn edit-mode-button invisible">delete</a>
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
//Listen to click
$('tbody').on('click', 'tr', toggleEditMode);
$('tbody').on('focusout', 'tr', function () {
    $(this).removeClass('half-invisible');
  });

// Listen to cancel button
$('tbody').on('click', '#cancel-button', removeInvisible);
// $('#cancel-button').click(removeInvisible);

