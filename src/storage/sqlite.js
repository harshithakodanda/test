import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("mfw.db");



export const dateTimeFormat = (val) => {
  var date = new Date();
  if (val) date = new Date(val);
  var dateStr =
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2) +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);
  return dateStr;
};

export const dateFormat = () => {
  var date = new Date();
  var dateStr =
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2);
  return dateStr;
};

export const datePickerFormat = () => {
  var date = new Date();
  var dateStr =
  ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" + 
    date.getFullYear()
  return dateStr;
};

export const nextDatePickerFormat = () => {
  var date = new Date();
  date.setDate(date.getDate()+1)
  var dateStr =
  ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" + 
    date.getFullYear()
  return dateStr;
};

export const datePickerToApiFormat = (dp)=>{
const arr = dp.split('/')
return arr[2]+"-"+arr[1]+"-"+arr[0]
}

export const queries = {
  selectAll: "select * from transactions order by transactionDate desc",
  selectNotProcessed:
    "select * from transactions where processed = 0 order by transactionDate",
  update: "update transactions set processed = 1 where id = ?",
  insert:
    "insert into transactions (organizationId,customerId,transactionType,paymentMode,transactionLedger,creditLedger,amount,referenceNo,additionalInfo,transactionDate,processed) values (?,?,?,?,?,?,?,?,?,?,?)",
  delete:
    "delete from transactions where processed = 1 and transactionDate < ?",
  create:
    "create table if not exists transactions (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, organizationId INT NOT NULL, customerId INT NOT NULL,transactionType TEXT NOT NULL,paymentMode TEXT NOT NULL,transactionLedger TEXT NOT NULL, creditLedger TEXT, amount TEXT NOT NULL, referenceNo TEXT, additionalInfo TEXT, transactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, processed BOOLEAN);",
  drop: "drop table transactions",
  dailySum:
    "select (select sum(amount) from transactions) as total,(select sum(amount) from transactions where paymentMode = 'Cash') as cash,(select  sum(amount) from transactions where paymentMode = 'Credit')as credit,(select  sum(amount) from transactions where paymentMode = 'Online')as online;",
  GLSum:
    "select (select sum(amount) from transactions where transactionLedger = 'Sales Account') as SalesAccount," +
    "(select sum(amount) from transactions where transactionLedger = 'Service Charges') as ServiceCharges," +
    "(select sum(amount) from transactions where transactionLedger = 'Other Receipts') as OtherReceipts," +
    "(select sum(amount) from transactions where transactionLedger = 'Bank Charges') as BankCharges," +
    "(select sum(amount) from transactions where transactionLedger = 'Interest on Loans') as InterestOnLoans," +
    "(select sum(amount) from transactions where transactionLedger = 'Electricity Charges') as ElectricityCharges," +
    "(select sum(amount) from transactions where transactionLedger = 'Purchase Account') as PurchaseAccount," +
    "(select sum(amount) from transactions where transactionLedger = 'Transportation') as Transportation," +
    "(select sum(amount) from transactions where transactionLedger = 'Business Promotions') as BusinessPromotions," +
    "(select sum(amount) from transactions where transactionLedger = 'TA and DA') as TADA," +
    "(select sum(amount) from transactions where transactionLedger = 'Staff Welfare') as StaffWelfare," +
    "(select sum(amount) from transactions where transactionLedger = 'Legal Charges') as LegalCharges," +
    "(select sum(amount) from transactions where transactionLedger = 'Water Charges') as WaterCharges",

  createMoneyIn:
    "create table if not exists MoneyIn (id INTEGER PRIMARY KEY NOT NULL,value TEXT NOT NULL)",
  insertMoneyIn: "insert into MoneyIn (id, value) values(?,?)",
  selectMoneyIn: "select * from MoneyIn",
  createMoneyOut:
    "create table if not exists MoneyOut (id INTEGER PRIMARY KEY NOT NULL,value TEXT NOT NULL)",
  insertMoneyOut: "insert into MoneyOut (id, value) values(?,?)",
  selectMoneyOut: "select * from MoneyOut",
  createCreditMoneyIn:
    "create table if not exists CreditMoneyIn (id INTEGER PRIMARY KEY NOT NULL,value TEXT NOT NULL)",
  insertCreditMoneyIn: "insert into CreditMoneyIn (id, value) values(?,?)",
  selectCreditMoneyIn: "select * from CreditMoneyIn",
  createCreditMoneyOut:
    "create table if not exists CreditMoneyOut (id INTEGER PRIMARY KEY NOT NULL,value TEXT NOT NULL)",
  insertCreditMoneyOut: "insert into CreditMoneyOut (id, value) values(?,?)",
  selectCreditMoneyOut: "select * from CreditMoneyOut",
};
