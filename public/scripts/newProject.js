console.log('beep')


$.ajax({
    xhrFields: {
        withCredentials: true
     },
    url:'../api/v1/newProject',
    method:'POST',
    data:{}
})