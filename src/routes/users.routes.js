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

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API untuk mengelola User
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Mendapatkan semua user
 *     tags: [users]
 *     responses:
 *       200:
 *         description: Daftar users
 */
usersRoutes.get('/', authenticateToken, fetchAllUsers);

/**
 * @swagger
 * /users:id:
 *    get:
 *      summary: Mendapatkan user berdasarkan id
 *      tags: [users]
 *      responses:
 *        200:
 *          description: user detail
 */
usersRoutes.get('/:id', authenticateToken, fetchUserById);

usersRoutes.put('/:id', authenticateToken, updateUserById);

usersRoutes.delete(
  '/:id',
  authenticateToken,
  requireRole(['admin']),
  deleteUserById
);

export default usersRoutes;
