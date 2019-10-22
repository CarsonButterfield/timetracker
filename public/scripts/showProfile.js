// get User ID
const userID = window.location.pathname.split('/')[2]
console.log(userID)

// SHow list of all user projects
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
    data.projects.forEach((project)=>{
      $('body').append(`
      <a href="/project/${project._id}">${project.projectName}</a>
      `)
    })
    
}

getProfile(userID)