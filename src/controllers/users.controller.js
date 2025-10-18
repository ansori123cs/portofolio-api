import logger from '#src/config/logger.js';
import { getAllUsers } from '#src/services/users.service.js';

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
