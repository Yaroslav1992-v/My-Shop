export const turnToArray = (num: number) => {
  const indices = [];
  for (let i = 0; i < num; i++) {
    indices.push(i);
  }
  return indices;
};
