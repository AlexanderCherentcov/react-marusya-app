export const getInitials = (name?: string, surname?: string) => {
  const first = name?.trim()?.[0]?.toUpperCase() ?? '';
  const last = surname?.trim()?.[0]?.toUpperCase() ?? '';
  return first + last;
};
