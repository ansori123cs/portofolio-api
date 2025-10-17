import express from 'express';

const usersRoutes = express.Router();

usersRoutes.get('/', (req, res) => {
  res.status(200).json({ message: 'get all users ' });
});

usersRoutes.get('/:id', (req, res) => {
  res.status(200).json({ message: 'get specified user by id' });
});

usersRoutes.put('/:id', (req, res) => {
  res.status(200).json({ message: 'edited users' });
});

usersRoutes.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'deleted specified users by id' });
});

export default usersRoutes;
