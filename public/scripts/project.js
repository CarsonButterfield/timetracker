// global variable
var project;

const projectID = window.location.pathname.split('/')[2];
// console.log(projectID);

// SHow project details
const getProject = (id) => {
    // console.log({id})
    console.log(`api/v1/project/${id} is running`)
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
    project = data;
    // data set
    console.log("project data:==>>>>");
    console.log(project);

    // console.log(data);
    // console.log(data.projectName);
    // console.log($('#project-head h2'));
    $('#project-head h2').text(data.projectName);
    $('#project-head p').text(data.companyName);
    $('#project-description').text(data.description);

}

getProject(projectID)

// data set
console.log("1 project data:==>>>>");
console.log(project);