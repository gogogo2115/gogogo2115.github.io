type ConvertData<T> = { length: number; totalProb: number; totalWeight: number; data: (T & { weight: number })[] };

export const convertDataFunc = <T extends { prob: number }>(data: T[]): ConvertData<T> => {
  if (!Array.isArray(data) || data.length === 0) return { length: 0, totalProb: 0, totalWeight: 0, data: [] };

  const { normalize, totalProb, totalWeight } = data.reduce(
    (acc, v) => {
      const p = Number.isFinite(v.prob) ? v.prob : 0;
      const w = Math.round(p * 10000);

      acc.totalProb += p;
      acc.totalWeight += w;
      acc.normalize.push({ ...v, weight: w });

      return acc;
    },
    { normalize: [] as (T & { weight: number })[], totalProb: 0, totalWeight: 0 }
  );

  return { length: normalize.length, totalProb, totalWeight, data: normalize };
};
