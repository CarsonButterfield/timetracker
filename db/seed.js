const db = require('../models');

const userList = require('./dataSet.json');

// removes all pokemon 
db.User.remove({}, () => {
    // loops through the json file
	userList.forEach(user => {
        // user.projects.forEach((project,i) => {
        //     db.Project.create(project, (error, createdProject) =>{
        //         user.projects[i] = createdProject;
        //     })
        // })
		// for each one creates a pokemon entry in the DB
		db.User.create(user, (error, createdUser) => {
			if (error) return console.log(error);
			console.log(createdUser);
		});
	});
});