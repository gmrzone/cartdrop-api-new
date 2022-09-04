export const getVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw Error(`Please Add Environment variable ${key}`);
  }
  return value;
};
