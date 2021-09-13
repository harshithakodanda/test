import numeral from "numeral";

export const formatNumber = (amount: number) => {
  return numeral(amount).format("0,0");
};
