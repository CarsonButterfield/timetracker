// get User ID
const userID = window.location.pathname.split('/')[2]
$('.modal').modal();
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
      <li data=${project._id} class="collection-item">
      
      <div class="row-item project-name">${project.projectName}</div>
      <div class="row-item company-name">${project.companyName}</div>
      <div class="row-item total-time">${totalTime.toFixed(2) } </div>
      <div class="row-item total-pay"> ${(project.payRate * totalTime).toFixed(2)} ${project.currency}
      </div>
     
      <a href="#modal1" class="material-icons modal-trigger delete-window">delete</a></li>
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
$('#confirm-delete').on('click', function (event) {
  removeProject($('#modal1').attr('data'))
})
$('#projects').on('click', '.delete-window', function (event) {
  
  $('#modal1').attr('data',`${$(this).parent().attr('data')}`)
  $('#modal1  h4').text('Confirm Deletion')
  $('#modal1 span').html(`I want to delete project <b>${$(this).siblings('.project-name').text()}</b> for company <b>${$(this).siblings('.company-name').text()}</b>`)
  $('#modal1  p').html(`This will permanently remove <b> ${$(this).siblings('.project-name').text()}</b> from your projects`)
  
})
$('#confirm-checkbox').on('change',function(event){
  console.log(this.checked)
  if(this.checked){
    $('#confirm-delete').removeClass('disabled')
  }
  else{
    $('#confirm-delete').addClass('disabled')
  }
})
$('#projects').on('click', '.collection-item', function (event) {
  // if(event.target.hasClass('material-icons')){
  //   console.log('stopped')
  //   return
  // }
 if( event.target.classList.contains('material-icons')){
   return
 }
 window.location.href = `/project/${$(this).attr('data')}`
})
const removeProject = (id) => {
 $('#projects').children().each(function (index) {
   if($(this).attr('data')=== id){
     $(this).remove()
   }
 })
  
  $.ajax({
    method:'DELETE',
    url:`../api/v1/project/${id}`,
   success:delSuccess,
   error:delErr,
  })

}
