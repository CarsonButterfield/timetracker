const onSuccess = (res) => {
    window.location = `./profile/${res.data.id}`
}
const onErr = (err) => {
    console.log(err)
}
$('#button').on('click',() => {
    getProfile()
    console.log('beep')
})
$('#login').on('submit',(event)=>{
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    $.ajax({
        method: 'POST',
        url : "./api/v1/login",
        data:{email,password},
        success:onSuccess,
        error:onErr
    })
})

  

 