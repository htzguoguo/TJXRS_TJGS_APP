export const addUniqueValueToObject = (obj: Object, value: string, key: string) => {
  if (obj.hasOwnProperty(key)) {
    const arr: string[] = obj[key];
    addUniqueValueToArray(arr, value);
  } else {
    obj[key] = [value];
  }
};

const addValueToObject = (obj: Object, value: Object, key: string) => {
  if (obj.hasOwnProperty(key)) {
    const arr: Object[] = obj[key];
    arr.push(value);
  } else {
    obj[key] = [value];
  }
};

const addUniqueValueToArray = (col: string[], value: string) => {
  if (!col.includes(value)) {
    col.push(value);
  }
};

function addItemToMap<T>(key: string, value: T, col: Map<string, T[]>) {
  if (col.has(key)) {
    col.get(key)?.push(value);
  } else {
    col.set(key, [value]);
  }
}

export function getObjectFirstItemOrEmpty (
  col: Object | null | undefined,
  key: string,
): string  {
  let result = '';
  if (col && col.hasOwnProperty(key)) {
    const arr = col[key];
    if (arr && arr.length > 0) {
      result = arr[0];
    }
  }
  return result;
};

export const  getObjectArrayOrEmpty = (
  col: Object | null | undefined,
  key: string,
) => {
  let result: string[] = [];
  if (col && col.hasOwnProperty(key)) {
    const arr = col[key];
    if (arr && arr.length > 0) {
      result = arr;
    }
  }
  return result;
};