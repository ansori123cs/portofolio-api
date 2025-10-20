import z from 'zod';

export const userIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'ID must be number')
    .transform(Number)
    .refine(val => val > 0, 'ID must be number'),
});

export const updateSchema = z
  .object({
    name: z.string().min(2).max(255).trim().optional(),
    email: z.string().min(2).max(225).toLowerCase().trim().optional(),
    role: z.enum(['user', 'admin']).optional(),
  })
  .refine(
    data => {
      Object.keys(data).lenth;
    },
    {
      message: 'At least one change for update',
    }
  );
