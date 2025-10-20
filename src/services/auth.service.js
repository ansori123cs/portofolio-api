import bcrypt from 'bcrypt';
import logger from '#config/logger.js';
import { db } from '#config/database.js';
import { eq } from 'drizzle-orm';
import { users } from '#models/user.model.js';

export const hashPassword = async password => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (e) {
    logger.error(`Error hashing password `, e);
    throw new Error('Error hashimh password');
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (e) {
    logger.error(`Error comparing password `, e);
    throw new Error('Error comparing password');
  }
};

export const createUser = async ({ name, email, password, role = 'user' }) => {
  try {
    const checkExitingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (checkExitingUser.length > 0)
      throw new Error('User with this email already exist');

    const pasword_hash = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({ name, email, password: pasword_hash, role })
      .returning({
        id: users.id,
        name: users.name,
        role: users.role,
        crated_at: users.created_at,
      });

    logger.info(`User ${newUser.email} crated successfully`);

    return newUser;
  } catch (e) {
    logger.error(`Error creating user `, e);
    throw e;
  }
};

export const authenticateUser = async ({ email, password }) => {
  try {
    const [exitingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    console.log(exitingUser);
    if (!exitingUser) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(
      password,
      exitingUser.password
    );

    if (!isPasswordValid) {
      throw new Error('Password is invalid');
    }

    logger.info(`User ${exitingUser.email} authenticated successfully`);

    return {
      id: exitingUser.id,
      name: exitingUser.name,
      email: exitingUser.email,
      role: exitingUser.role,
      created_at: exitingUser.created_at,
    };
  } catch (e) {
    logger.error(`Error authenticating user`, e);
    throw e;
  }
};

export const checkRefreshToken = () => {};
