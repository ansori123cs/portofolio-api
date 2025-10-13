export const formatValidationError = errors => {
  if (!errors || errors.issues) return 'validation error';

  if (Array.isArray(errors.issues))
    return errors.issues.map(i => i.message).join(', ');

  return JSON.stringify(errors);
};
