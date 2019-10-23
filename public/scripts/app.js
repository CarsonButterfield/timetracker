
const onSuccess = (res) => {
    window.location = `./profile/${res.data.id}`
}
const onCreate = (res) => {
    let email = $('#createEmail').val()
    let password = $('#createPassword').val()
    $.ajax({
        method: 'POST',
        url : "./api/v1/login",
        data:{email,password},
        success:onSuccess,
        error:onErr
    })
}
const onErr = (err) => {
    console.log(err)
}
$('#button').on('click',() => {
    getProfile()
    console.log('beep')
})
$('#loginbutton').on('click',(event)=>{
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
$('#createbutton').on('click',(event)=>{
    if($('#createPassword').val() !== $('#confirmPassword').val()){
        return console.log('passwords do not match')
    }
    let email = $('#createEmail').val()
    let password = $('#createPassword').val()
    let userName = $('#name').val()
    $.ajax({
        method: 'POST',
        url : "./api/v1/signup",
        data:{email,password,userName},
        success:onCreate,
        error:onErr
    })
})
  

M.AutoInit();