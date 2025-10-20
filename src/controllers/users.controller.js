import logger from '#src/config/logger.js';
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '#src/services/users.service.js';
import { formatValidationError } from '#src/utils/format.js';
import {
  updateSchema,
  userIdSchema,
} from '#src/validations/users.validation.js';

export const fetchAllUsers = async (req, res, next) => {
  try {
    logger.info('Getting users ....');

    const allUsers = await getAllUsers();

    res.status(200).json({
      message: 'Successfully fetch all users',
      users: allUsers,
      count: allUsers.length,
    });
  } catch (e) {
    logger.error('Error fetching users', e);
    next(e);
  }
};

export const fetchUserById = async (req, res, next) => {
  try {
    logger.info(`Getting user by Id :${req.params.id}`);

    const validationResult = userIdSchema.safeParse({ id: req.params.id });

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        message: formatValidationError(validationResult.error),
      });
    }

    const { id } = validationResult.data;

    const user = await getUserById(id);

    logger.info(`User :${user.email} retrieved successfully`);

    res.json({
      message: 'User retrieved successfully',
      user,
    });
  } catch (e) {
    logger.error('Error fetching user by id', e);

    if (e.message === 'User not found') {
      return res.status(404).json({
        error: 'User not found',
        message: 'User not found',
      });
    }
    next(e);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    logger.info(`Updating user :${rq.params.id}`);

    const idValidationResult = userIdSchema.safeParse({ id: req.params.id });

    if (!idValidationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        message: formatValidationError(idValidationResult.error),
      });
    }

    const updateValidationResult = updateSchema.safeParse({ id: req.body });

    if (!updateValidationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        message: formatValidationError(updateValidationResult.error),
      });
    }

    const { id } = idValidationResult.data;

    const updates = updateValidationResult.data;

    if (!req.user) {
      return res.status(401).json({
        error: 'Authenticate failed',
        message: 'You must login to update your account',
      });
    }

    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You can only update your own information',
      });
    }

    if (updates.role && req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Only administrators can change user roles',
      });
    }

    if (req.user.role !== 'admin') {
      delete updates.role;
    }

    const updatedUser = await updateUser(id, updates);

    logger.info(`User :${updatedUser.email} update successfully`);
    res.json({
      message: 'User update Successfully',
      user: updatedUser,
    });
  } catch (e) {
    logger.error('Error updating user', e);

    if (e.message === 'User not found') {
      return res.status(404).json({
        error: 'User not found',
        message: 'User not found',
      });
    }

    if (e.message === 'Email already exists') {
      return res.status(409).json({
        error: 'Email already exists',
        message: 'Email already exists',
      });
    }

    next(e);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    logger.info(`Deleting User :${req.params.id}`);

    const validationResult = userIdSchema({ id: req.params.id });

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation error',
        message: formatValidationError(validationResult.error),
      });
    }

    const { id } = validationResult.data;

    if (!req.user) {
      return res.status(401).json({
        error: 'Authenticate failed',
        message: 'You must login to delete user',
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Only administrator can delete user',
      });
    }

    if (req.user.id === id) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You cannot delete your own account ',
      });
    }

    const deletedUser = await deleteUser(id);

    logger.info(`User :${deleteUser.email} successfully deleted`);

    res.json({
      message: 'User deleted successfully',
      user: deleteUser,
    });
  } catch (e) {
    logger.error(`Error deleting user`, e);

    if (e.message === 'User not found') {
      return res.status(404).json({
        error: 'User not found',
        message: 'User not found',
      });
    }
    next(e);
  }
};
