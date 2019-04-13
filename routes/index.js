const express = require('express');
const router = express.Router();

const Admin = require('../models/Admin'); //admin model

router.get('/', (req, res) => {
	res.render("info/insert", {
		viewTitle: "Insert"
	});
});

//save handle
router.post('/', (req, res) => {
	const {
		place,
		country,
		description
	} = req.body;

	const newAdmin = new Admin({
		place,
		country,
		description
	});
	//save places
	newAdmin.save().then(user => {
		res.redirect('/list'); //successfully insert howar por list a chole jabe
	}).catch(err => console.log(err));
	//save places
});
//save handle

//update
router.post('/update/:id', (req, res) => {
	Admin.findOneAndUpdate({
		_id: req.body._id
	}, req.body, {
		new: true
	}, (err, doc) => {
		res.render("info/insert", {
			viewTitle: 'Update',
			employee: req.body
		});
	});
});
//update

// DELETE
router.get('/delete/:id', (req, res) => {
	Admin.findOneAndDelete(req.params.id, (err, doc) => {
		if (!err) {
			res.redirect('/list');
		} else {
			console.log('Error in delete :' + err);
		}
	});
});
//delete

// READ (ALL)
router.get('/list', (req, res) => {
	Admin.find((err, docs) => {
		if (!err) {
			res.render("info/list", {
				list: docs
			});
		} else {
			console.log('Error in retrieving list :' + err);
		}
	});
});
// READ (ALL)

module.exports = router;
