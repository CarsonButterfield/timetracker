// get User ID
const userID = window.location.pathname.split('/')[2]

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

const convertToHours = (miliseconds) => {
  return ((miliseconds/1000) / 60)/60
}
const handleSuccess = (data) => {
    $('h1').text(`Welcome, ${data.userName}`)

    data.projects.forEach((project)=>{
      let totalTime = 0
      project.workingTime.forEach((timestamp)=>{
        console.log(timestamp)
        let startTime = new Date(timestamp.startTime).getTime()
        let endTime = new Date(timestamp.endTime).getTime()
        totalTime += endTime - startTime

      })
    
    totalTime = convertToHours(totalTime)
      $('#projects').append(`
      <li data=${project._id} class="collection-item"><div class="row-item">${project.projectName}</div><div class="row-item">${project.companyName}</div><div class="row-item">${totalTime.toFixed(2) } </div><div class="row-item"> ${project.payRate * totalTime} ${project.currency}</div><div class="deleteProject"><i class="material-icons">delete</i></div><a href="/project/${project._id}" class="secondary-content"><i class="material-icons">send</i></a></li>
      `)
      
    })
    
}


getProfile(userID)
const delSuccess = (res) => {
  console.log({res})
}
const delErr = (err) =>{
  console.log({err})
}
$('#projects').on('click', '.deleteProject', function (event) {
  removeProject($(this).parent())
})
const removeProject = ($project) => {
  console.log($project)
  $.ajax({
    method:'DELETE',
    url:`../api/v1/project/${$project.attr('data')}`,
   success:delSuccess,
   error:delErr,
  })

}
