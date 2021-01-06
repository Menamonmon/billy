export function capitalize(string) {
  let result = "";
  for (let i = 0; i < string.length; i++) {
    if (i === 0) {
      result += string.charAt(i).toUpperCase();
      continue;
    }
    result += string.charAt(i).toLowerCase();
  }
  return result;
}

