import { db } from '#src/config/database.js';
import logger from '#src/config/logger.js';
import { users, users } from '#src/models/user.model.js';
import { eq } from 'drizzle-orm';
import { error } from 'winston';

export const getAllUsers = async () => {
  try {
    return await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        created_at: users.created_at,
        updated_at: users.updated_at,
      })
      .from(users);
  } catch (e) {
    logger.error('Error getting users', e);
    throw e;
  }
};

export const getUserById = async id => {
  try {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        created_at: users.created_at,
        updated_at: users.updated_at,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (e) {
    logger.error(`Error get user by id : ${id}`, e);
    throw e;
  }
};

export const updateUser = async (id, updates) => {
  try {
    const exitingUser = await getUserById(id);

    if (!exitingUser) {
      throw new Error('User not Found');
    }
    if (updates.email && updates.email !== exitingUser.email) {
      const [checkEmailExist] = await db
        .select()
        .from(users)
        .where(eq(users.email, updates.email))
        .limit(1);

      if (checkEmailExist) {
        throw new Error('Email allready exist');
      }
    }

    const updateData = {
      ...updates,
      updated_at: new Date(),
    };

    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        created_at: users.created_at,
        updated_at: users.updated_at,
      });

    logger.info(`User : ${updatedUser.email} updated successfully `);
    return updatedUser;
  } catch (e) {
    logger.error(`Error Update User : ${id}`, e);
    throw e;
  }
};

export const deleteUser = async id => {
  try {
    const exitingUser = await getUserById(id);

    if (!exitingUser) {
      throw new Error('User not Found');
    }

    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        name: users.id,
        email: users.email,
        role: users.role,
      });

    logger.info(`User : ${deletedUser.email} deleted successfully `);
    return deletedUser;
  } catch (e) {
    logger.error(`Error deleting User ${id}`, e);
    throw e;
  }
};
