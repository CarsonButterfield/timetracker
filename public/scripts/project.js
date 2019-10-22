console.log("Hey There");


const projectID = window.location.pathname.split('/')[2];
console.log(projectID);

// SHow project details
const getProject = (id) => {
    console.log({id})
    fetch(`../api/v1/project/${id}`, {
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
    console.log(data);
    console.log(data.projectName);
    console.log($('#project-head h2'));
    $('#project-head h2').text(data.projectName);
    $('#project-head p').text(data.companyName);
    $('#project-description').text(data.description);
}

getProject(projectID)