console.log('beep')
$('#new-project').on('submit',(event)=>{
   
    event.preventDefault()
    let projectObject = {
        projectName:$('#projectName').val(),
        companyName:$('#companyName').val(),
        description:$('#description').val(),
        startDate: $('#startDate').val(),
        payRate: $('#payRate').val(),
        currency:$('#currency').val(),
        extraHoursTime:$('#extraHoursTime').val(),
        extraHoursPayRate:$('#extraHoursPayRate').val(),
        timeLimitNumber:$('#timeLimitNumber').val(),
        timeLimitUnit:$('#timeLimitUnit').val(),
       
    }
    $.ajax({
        xhrFields: {
            withCredentials: true
         },
        url:'../api/v1/newProject',
        method:'POST',
        data:projectObject,
        success:onSuccess,
        error:onError
    })
})

const onSuccess = (res) => {
    console.log(res)
}
const onError = (err) => {
    console.log(err)
}