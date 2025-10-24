import { db } from '#/config/database.js';
import { portofolio } from '#/models/portofolio.model.js';
export const getAllPortofolios = async () => {
  try {
    return await db.select({}).from(portofolio);
  } catch (e) {}
};

export const getPortofolioById = async id => {};
