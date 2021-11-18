const mysql = require('mysql');


// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});



// View Authors
exports.viewAuthor = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM author', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('authors', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from Authors table: \n', rows);
  });
}

// View reviewers
exports.viewReviewer = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM reviewers', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('reviewers', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from Reviewer table: \n', rows);
  });
}


// View manuscripts
exports.viewManuscripts = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM manuscripts', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });

    } else {
      console.log(err);
    }
    console.log('The data from Manuscripts table: \n', rows);
  });
}

// View reviewers Dashboard
exports.reviewerManuscripts = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM manuscripts', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('reviewer-home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from Manuscripts table: \n', rows);
  });
}

// View authors Dashboard
exports.authorManuscripts = (req, res) => {

  if(req.session.loggedin){
  // User the connection
  connection.query('SELECT * FROM manuscripts ', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('author-home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from Manuscripts table: \n', rows);
  });
}else{
  req.flash('success', 'Incorrect login!');
  res.redirect('/authorLogin');
}
}


// Find manuscripts by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM manuscripts WHERE title LIKE ? OR topic LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from manuscripts table: \n', rows);
  });
}

// Add new manuscripts as editor
exports.addManuscript = (req, res) => {
  const { title, author, topic, reviewer, point, status, content } = req.body;
  let searchTerm = req.body.search;
  // User the connection
  connection.query('INSERT INTO manuscripts SET title = ?, author = ?, topic = ?, reviewer = ?, point = ?, status = ?, content = ?', [title, author, topic, reviewer, point, status, content], (err, rows) => {
    if (!err) {
      res.render('add-manuscript', { alert: 'Manuscript added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from manuscripts table: \n', rows);
  });
}

exports.manuscriptForm = (req, res) => {
  res.render('add-manuscript');
}

// Submit manuscripts as author
exports.AuthoraddManuscript = (req, res) => {
  const { title, topic, content } = req.body;
  let searchTerm = req.body.search;
  // User the connection
  connection.query('INSERT INTO manuscripts SET title = ?, topic = ?, content = ?', [title, topic, content], (err, rows) => {
    if (!err) {
      res.render('author-add-manuscript', { alert: 'Manuscript submitted successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from manuscripts table: \n', rows);
  });
}

exports.AuthormanuscriptForm = (req, res) => {
  res.render('author-add-manuscript');
}


// Add new author
exports.newauthor = (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO author SET email = ?, firstName = ?, lastName = ?, password = ?', [email, firstName, lastName, password], (err, rows) => {
    if (!err) {
      res.render('register-author', { alert: 'Author added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from authors table: \n', rows);
  });
}

exports.authorform = (req, res) => {
  res.render('register-author');
}



// Add new reviewer
exports.create = (req, res) => {
  const { email, firstName, lastName, password, specialty } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO reviewers SET email = ?, firstName = ?, lastName = ?, password = ?, specialty=?', [email, firstName, lastName, password, specialty], (err, rows) => {
    if (!err) {
      res.render('register-user', { alert: 'Reviewer added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from reviewer table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('register-user');
}

// Edit reviewer
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM reviewers WHERE email = ?', [req.params.email], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Update reviewers
exports.update = (req, res) => {
  const { email, firstName, lastName, password, specialty } = req.body;
  // User the connection
  connection.query('UPDATE reviewers SET firstName = ?, lastName = ?, password = ?, specialty=? WHERE email = ?', [email, firstName, lastName, password, specialty, req.params.email], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM editor WHERE email = ?', [req.params.email], (err, rows) => {
        // When done with the connection, release it

        if (!err) {
          res.render('edit-user', { rows, alert: `${email} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from editor table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from editor table: \n', rows);
  });
}

// Editor edit manuscripts
exports.editManuscript = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM manuscripts WHERE ID = ?', [req.params.ID], (err, rows) => {
    if (!err) {
      res.render('edit-manuscript', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from manuscript table: \n', rows);
  });
}

// Editor edit manuscripts
exports.deleteManuscript = (req, res) => {
  // User the connection
  connection.query('DELETE FROM manuscripts WHERE ID = ?', [req.params.ID], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from manuscript table: \n', rows);
  });
}

// Update individual manuscript
exports.updateManuscript = (req, res) => {
  const { author, point, reviewer, status, title, topic, content } = req.body;
  // User the connection
  connection.query('UPDATE manuscripts SET author = ?, point = ?, reviewer = ?, status=?, title=?, topic=?, content=? WHERE ID = ?', [author, point, reviewer, status, title, topic, content, req.params.ID], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM editor WHERE ID = ?', [req.params.ID], (err, rows) => {
        // When done with the connection, release it

        if (!err) {
          res.render('edit-manuscript', { rows, alert: `Manuscript has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from editor table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from editor table: \n', rows);
  });
}

// View individual manuscript
exports.viewMan = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM manuscripts WHERE ID = ?', [req.params.ID], (err, rows) => {
    if (!err) {
      res.render('view-manuscript', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}


// View editors
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT firstName, lastName, email FROM editor WHERE email = ?', [req.params.ID], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}

//register
exports.createAuthor = (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO authors SET email = ?, firstName = ?, lastName = ?, password = ?', [email, firstName, lastName, password], (err, rows) => {
    if (!err) {
      res.render('register', { alert: 'Account creation success.' });
    } else {
      console.log(err);
    }
    console.log('The data from reviewer table: \n', rows);
  });
}

//Login
exports.authorLogin = (req, res) =>{
  const { email, password, firstName} = req.body;
  var session;
  connection.query('SELECT * FROM author WHERE email = ? AND password = ?', [email, password],(err,rows)=>  {
      // if user not found
      if (rows.length <= 0) {
          req.flash('error', 'Please correct enter email and Password!')
          res.redirect('authorLogin')
      }
      else { // if user found
          // render to views/user/edit.ejs template file
          session = req.session;
          req.session.loggedin = true;
          req.session.name = firstName;
          res.redirect('authorDashboard');
          console.log(req.session);
      }
  });
}

exports.authorformLogin = (req, res) => {
  res.render('author-login');
}

//billing
exports.billing = (req, res) => {
  res.render('author-billing',{ alert: 'Payment success.' });
}


//Login
exports.editorLogin = (req, res) =>{
  const { email, password, firstName } = req.body;
  connection.query('SELECT * FROM editor WHERE email = ? AND password = ?', [email, password],(err,rows)=> {
      if(err) throw err

      // if user not found
      if (rows.length <= 0) {
          req.flash('error', 'Please correct enter email and Password!')
          res.redirect('editorLogin')
      }
      else { // if user found
          // render to views/user/edit.ejs template file
          req.session.loggedin = true;
          req.session.name = firstName;
          res.redirect('/home');

      }
  });
}//Login

exports.editorformLogin = (req, res) => {
  res.render('editor-login');
}

exports.reviewerLogin = (req, res) =>{
  const { email, password, firstName} = req.body;
  connection.query('SELECT * FROM reviewers WHERE email = ? AND password = ?', [email, password],(err,rows)=> {
      if(err) throw err

      // if user not found
      if (rows.length <= 0) {
          req.flash('error', 'Please correct enter email and Password!')
          res.redirect('reviewerLogin')
      }
      else { // if user found
          // render to views/user/edit.ejs template file
          req.session.loggedin = true;
          req.session.name = firstName;
          res.redirect('reviewerDashboard');

      }
  })
}
exports.reviewerformLogin = (req, res) => {
  res.render('reviewer-login');
}

//user logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}
