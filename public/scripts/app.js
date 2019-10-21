const onSuccess = (data) => {
    console.log(data)
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
const getProfile = () => {
    fetch(`./api/v1/profile/123`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(dataStream => dataStream.json())
      .then(res => {
        console.log(res);
        handleSuccess(res.data);
      })
      .catch(err => console.log(err));
  }
  
  const handleSuccess = (user) => {
      console.log(user)

  }
 