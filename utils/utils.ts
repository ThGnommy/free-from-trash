export const convertUidParamToArray = (str: string) => {
  const result = [];
  const comma = ",";
  let id = "";

  for (let i = 0; i <= str.length; i++) {
    if (str[i] === comma) {
      result.push(id);
      id = "";
    } else if (i === str.length) {
      result.push(id);
    } else {
      id += str[i];
    }
  }

  return result;
};
