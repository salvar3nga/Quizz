export type FinalMessages = {
  [K in FinalMessageKey]: string[];
};

export enum FinalMessageKey {
  ZERO = 0,
  TWENTY = 20,
  FIFTY = 50,
  EIGHTY = 80,
  HUNDRED = 100,
}
