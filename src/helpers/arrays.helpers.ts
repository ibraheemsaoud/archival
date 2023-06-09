export const checkIfArrayInAnotherArray = (array1: any[], array2: any[]) => {
  return array1.every((item) => array2.includes(item));
};
