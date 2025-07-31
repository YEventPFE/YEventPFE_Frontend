export const normalizeDotNetJson = <T>(obj: any, refMap = new Map()): T => {
  if (Array.isArray(obj)) {
    return obj.map(item => normalizeDotNetJson(item, refMap)) as unknown as T;
  }

  if (obj && typeof obj === 'object') {
    if ('$ref' in obj) {
      const refId = obj['$ref'];
      return refMap.get(refId) as T;
    }

    if ('$id' in obj) {
      const id = obj['$id'];
      obj = { ...obj };
      delete obj['$id'];
      refMap.set(id, obj);
    }

    if ('$values' in obj && Object.keys(obj).length === 1) {
      return normalizeDotNetJson(obj['$values'], refMap);
    }

    for (const key of Object.keys(obj)) {
      obj[key] = normalizeDotNetJson(obj[key], refMap);
    }

    return obj;
  }

  return obj;
}