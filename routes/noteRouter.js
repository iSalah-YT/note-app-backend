const express = require('express');
const {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controller/NoteController');

const router = express.Router();

router.route('/').get(getAllNotes).post(createNote);
router.route('/:id').get(getNoteById).patch(updateNote).delete(deleteNote);

module.exports = router;
