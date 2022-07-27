const express = require('express');
const router = express.Router();

const Book = require('../../models/repositories');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('Book route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'Tidak ada buku yang dicari' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'Tidak ada buku yang dicari' }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  Book.create(req.body)
    .then(book => res.json({ msg: 'Buku telah dimasukkan' }))
    .catch(err => res.status(400).json({ error: 'Tidak dapat menyimpan jenis buku ini' }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Proses update sukses' }))
    .catch(err =>
      res.status(400).json({ error: 'Tidak dapat meng-update database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Entrii buku telah terhapus' }))
    .catch(err => res.status(404).json({ error: 'Tidak ada buku' }));
});

module.exports = router;