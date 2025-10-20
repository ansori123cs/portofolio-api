import logger from '#src/config/logger.js';
import { jwttoken } from '#src/utils/jwt.js';

export const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'no access token provided',
      });
    }

    const decoded = jwttoken.decoded(token);

    req.user = decoded;

    logger.info(`User authenticated ${decoded.email} - ${decode.role}`);

    next();
  } catch (e) {
    logger.error('Authenticate error', e);

    if (e.message === 'Failed to authenticate token') {
      return res.status(401).json({
        error: 'Authenticate failed',
        message: 'Invalid or Expired token',
      });
    }
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Error during authentication',
    });
  }
};

export const requireRole = allowedRoles => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Authentication required',
          message: 'User not authenticate',
        });
      }

      if (!allowedRoles.include(req.user.role)) {
        logger.warn(
          `Access denied from :${req.user.email} with role :${req.user.role} required : ${allowedRoles.join(', ')}`
        );
        return res.status(401).json({
          error: 'Access denied',
          message: 'Insufficient permissions',
        });
      }
      next();
    } catch (e) {
      logger.error('Role verification error', e);

      return res.status(500).json({
        error: 'Internal server error',
        message: 'Error during role verification',
      });
    }
  };
};
