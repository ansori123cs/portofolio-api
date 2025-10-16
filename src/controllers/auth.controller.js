import logger from '#config/logger.js';
import { authenticateUser, createUser } from '#services/auth.service.js';
import { formatValidationError } from '#utils/format.js';
import { jwttoken } from '#utils/jwt.js';
import { cookies } from '#utils/cookies.js';
import { signInSchema, signUpSchema } from '#validations/auth.validation.js';

export const signUp = async (req, res, next) => {
  try {
    const validationResult = signUpSchema.safeParse(req.body);
    if (!validationResult.success) {
      console.log(validationResult.error);
      return res.status(400).json({
        error: 'error validation',
        details: formatValidationError(validationResult.error),
      });
    }

    const { email, name, password, role } = validationResult.data;

    const user = await createUser({ name, email, password, role });

    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    cookies.set(res, 'token', token);

    logger.info(`user registered succesfully : ${email}`);

    res.status(201).json({
      message: 'user registered',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    logger.error('error while signup', e);

    if (e.message === 'User with this email already exist') {
      return res.status(409).json({ error: 'user has already exist' });
    }

    next(e);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const validationResult = signInSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }
    const { email, password } = validationResult.data;

    const user = await authenticateUser({ email, password });

    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    cookies.set(res, 'token', token);

    logger.info(`User SignIn Successfully :${user.email} `);

    res.status(200).json({
      message: 'User Signed In Successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    logger.error('Error Sign In', e);
    if (e.message === 'User not found' || e.message === 'Password is invalid') {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }
    next(e);
  }
};
export const signOut = async (req, res, next) => {
  try {
    cookies.clear(res, 'token');

    logger.info('User Sign Out Successfully');
    res.status(200).json({ message: 'Sign Out Successfully ' });
  } catch (e) {
    logger.error(`Error Sign Out`, e);
    next(e);
  }
};
