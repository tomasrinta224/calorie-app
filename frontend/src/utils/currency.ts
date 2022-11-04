export const toDollar = (cents: number) => {
  return (cents / 100.0).toFixed(2);
};
