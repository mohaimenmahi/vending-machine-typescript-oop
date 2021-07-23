export function isString(str: string): boolean {
  if(str) {
    if(str.length) return true;
    else return false
  } else return false;
}

export function validConvert(str: string): string {
  return str.replace(/[\s|&;$%@"<>()+,-]/g, "")
}