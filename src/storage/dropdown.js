import { db, queries } from "./sqlite";

export const creditMoneyIn = [
  {
    id: 0,
    value: "Advance from Customers",
  },
  {
    id: 1,
    value: "Bills Receivable",
  },
  {
    id: 2,
    value: "Trade Debtors",
  },
];

export const creditMoneyOut = [
  {
    id: 0,
    value: "Advance to Suppliers",
  },
  {
    id: 1,
    value: "Bills Payable",
  },
  {
    id: 2,
    value: "Trade Creditors",
  },
];

export const MoneyOut = [
  {
    id: 0,
    value: "Bank Charges",
  },
  {
    id: 1,
    value: "Business Promotions",
  },
  {
    id: 2,
    value: "Electricity Charges",
  },
  {
    id: 3,
    value: "Interest on Loans",
  },
  {
    id: 4,
    value: "Legal Charges",
  },
  {
    id: 5,
    value: "Purchase Account",
  },
  {
    id: 6,
    value: "Rent",
  },
  {
    id: 7,
    value: "Staff Welfare",
  },
  {
    id: 8,
    value: "TA and DA",
  },
  {
    id: 9,
    value: "Trading Expenses",
  },
  {
    id: 10,
    value: "Transportation",
  },
  {
    id: 11,
    value: "Water Charges",
  },
];

export const MoneyIn = [
  {
    id: 0,
    value: "Sales Account",
  },
  {
    id: 1,
    value: "Service Charges",
  },
  {
    id: 2,
    value: "Other Receipts",
  },
];

export const initializeDropdown = () => {
  db.transaction((tx) => {
    tx.executeSql(
      queries.createMoneyIn,
      [],
      (_, res) => {
        MoneyIn.forEach((val, i) => {
          tx.executeSql(
            queries.insertMoneyIn,
            [val.id, val.value],
            (_, res) => {},
            (_, err) => {
              console.log(err);
              return false;
            }
          );
        });
      },
      (_, err) => {
        console.log(err);
        return false;
      }
    );
    tx.executeSql(
      queries.createCreditMoneyIn,
      [],
      (_, res) => {
        creditMoneyIn.forEach((val, i) => {
          tx.executeSql(
            queries.insertCreditMoneyIn,
            [val.id, val.value],
            (_, res) => {},
            (_, err) => {
              console.log(err);
              return false;
            }
          );
        });
      },
      (_, err) => {
        console.log(err);
        return false;
      }
    );
    tx.executeSql(
      queries.createMoneyOut,
      [],
      (_, res) => {
        MoneyOut.forEach((val, i) => {
          tx.executeSql(
            queries.insertMoneyOut,
            [val.id, val.value],
            (_, res) => {},
            (_, err) => {
              console.log(err);
              return false;
            }
          );
        });
      },
      (_, err) => {
        console.log(err);
        return false;
      }
    );
    tx.executeSql(
      queries.createCreditMoneyOut,
      [],
      (_, res) => {
        creditMoneyOut.forEach((val, i) => {
          tx.executeSql(
            queries.insertCreditMoneyOut,
            [val.id, val.value],
            (_, res) => {},
            (_, err) => {
              console.log(err);
              return false;
            }
          );
        });
      },
      (_, err) => {
        console.log(err);
        return false;
      }
    );
  });
};
