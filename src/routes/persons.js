const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Persons
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM person', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Employee
router.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM person WHERE id = ?', [id], (err, rows, fields) => {
     if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An Employee
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM person WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Employee Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An Person
router.post('/', (req, res) => {
  const {id, name, birth} = req.body;
  console.log(id, name, birth);
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @birth = ?;
    CALL personAddOrEdit(@id, @name, @birth);
  `;
  mysqlConnection.query(query, [id, name, birth], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Person Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { name, birth } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @birth = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Person Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
