import {
  deleteUserById,
  fetchAllUsers,
  fetchUserById,
  updateUserById,
} from '#src/controllers/users.controller.js';
import {
  authenticateToken,
  requireRole,
} from '#src/middleware/auth.middleware.js';
import express from 'express';

const usersRoutes = express.Router();

usersRoutes.get('/', authenticateToken, fetchAllUsers);

usersRoutes.get('/:id', authenticateToken, fetchUserById);

usersRoutes.put('/:id', authenticateToken, updateUserById);

usersRoutes.delete(
  '/:id',
  authenticateToken,
  requireRole(['admin']),
  deleteUserById
);

export default usersRoutes;
