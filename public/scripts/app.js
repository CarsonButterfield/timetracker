$('#button').on('click',() => {
    getProfile()
    console.log('beep')
})
$('#login').on('click',(event)=>{
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    $.ajax({
        method: 'POST'
    })
})
const getProfile = () => {
    fetch(`http://localhost:5000/api/v1/profile/123`, {
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
 