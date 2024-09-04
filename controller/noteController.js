const Note = require('../Model/noteModel');
const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');

exports.getAllNotes = catchAsync(async (req, res, next) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: 'success',
    date: {
      notes,
    },
  });
});

// get id
exports.getNoteById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError('No id provided', 404));
  const note = await Note.findById(id);

  res.status(200).json({
    status: 'success',
    date: {
      note,
    },
  });
});

// create
exports.createNote = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return next(new AppError('Please provide title and content', 400));
  }
  const newNote = new Note({
    title,
    content,
  });
  await newNote.save();
  res.status(201).json({
    status: 'success',
    date: {
      note: newNote,
    },
  });
});

// update
exports.updateNote = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    {
      title,
      content,
      updatedAt: Date.now(),
    },
    { new: true }
  );

  if (!updatedNote)
    return next(new AppError('No note found with that id', 404));
  res.status(200).json({
    status: 'success',
    date: {
      updatedNote,
    },
  });
});

// delete
exports.deleteNote = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);

  res.status(204).json({
    date: null,
  });
});
