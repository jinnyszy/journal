const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

// Routes
router.post('/authorSubmit', userController.AuthoraddManuscript);
router.get('/authorSubmit', userController.AuthormanuscriptForm);
router.get('/billing', userController.billing);
router.post('/authorLogin', userController.authorLogin);
router.get('/authorLogin', userController.authorformLogin);
router.get('/', userController.authorformLogin);
router.post('/editorLogin', userController.editorLogin);
router.get('/editorLogin', userController.editorformLogin);
router.post('/reviewerLogin', userController.reviewerLogin);
router.get('/reviewerLogin', userController.reviewerformLogin);
router.get('/author', userController.viewAuthor);
router.get('/reviewer', userController.viewReviewer);
router.get('/authorDashboard', userController.authorManuscripts);
router.get('/reviewerDashboard', userController.reviewerManuscripts);
router.get('/home', userController.viewManuscripts);
router.post('/home', userController.find);
router.post('/addmanuscript', userController.addManuscript);
router.get('/addmanuscript', userController.manuscriptForm);
router.get('/edituser/:email', userController.edit);
router.post('/edituser/:email', userController.update);
router.get('/viewuser/:email', userController.viewall);
router.get('/editManuscript/:ID', userController.editManuscript);
router.get('/deleteManuscript/:ID', userController.deleteManuscript);
router.post('/editManuscript/:ID', userController.updateManuscript);
router.get('/viewMan/:ID', userController.viewMan);
router.get('/register', userController.form);
router.post('/register', userController.create);
router.get('/registerAuthor', userController.authorform);
router.post('/registerAuthor', userController.newauthor);
router.get('/logout', userController.logout);

module.exports = router;
