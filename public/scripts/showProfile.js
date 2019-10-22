const userID = window.location.pathname.split('/')[2]
console.log(userID)
const getProfile = (id) => {
    console.log({id})
    fetch(`../api/v1/profile/${id}`, {
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
      $('body').append(`
      <h1>${data.email}<h1>
      `)
  }

  getProfile(userID)