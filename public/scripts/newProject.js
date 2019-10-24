console.log('beep')
$('#new-project').on('submit',(event)=>{
   let required = ['projectName','companyName','description','startDate','payRate','currency']
   let valid = true;
    event.preventDefault()
    let projectObject = {
        projectName:$('#projectName').val(),
        companyName:$('#companyName').val(),
        description:$('#description').val(),
        startDate: $('#startDate').val(),
        payRate: $('#payRate').val(),
        currency:$('#currency').children('option:selected').val(),
        extraHoursTime:$('#extraHoursTime').val(),
        extraHoursPayRate:$('#extraHoursPayRate').val(),
        timeLimitNumber:$('#timeLimitNumber').val(),
        timeLimitUnit:$('#timeLimitUnit').val(),
       
    }
required.forEach((requirment) => {
    if(projectObject[requirment] === ''){
        let target = `#${requirment}`
        console.log(target)
        $(target).addClass('invalid')
        valid = false;
    }
})
    if(!valid){
        return
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
    window.location.href = "/profile"
}
const onError = (err) => {
    console.log(err)
}
$('.datepicker').datepicker();
$('select').formSelect();