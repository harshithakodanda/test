import { SOURCE_ICON } from "images";
import { IMAGE } from "images/Images";
import Routes from "./Routes";

export const phonesAreaCodes = [
  {
    id: 0,
    img: require("images/country/img_flag.png"),
    name: "India",
    code: "+91",
  },
];

export const CATEGORY_LIST_EXAMPLE = [
  {
    id: 0,
    name: "Select",
  },
  {
    id: 1,
    name: "Category 1",
  },
  {
    id: 2,
    name: "Category 2",
  },
  {
    id: 3,
    name: "Category 3",
  },
  {
    id: 4,
    name: "Category 4",
  },
  {
    id: 5,
    name: "Category 5",
  },
  {
    id: 6,
    name: "Category 6",
  },
  {
    id: 7,
    name: "Category 7",
  },
  {
    id: 8,
    name: "Category 8",
  },
  {
    id: 9,
    name: "Category 9",
  },
];

export const FREQUENCY_LIST_EXAMPLE = [
  {
    id: 0,
    name: "Select",
  },
  {
    id: 1,
    name: "Frequency 1",
  },
  {
    id: 2,
    name: "Frequency 2",
  },
  {
    id: 3,
    name: "Frequency 3",
  },
];

export const TRENDING_TOPICS_DATA = [
  {
    id: 0,
    image: require("images/down.png"),
    link: "http://i3.ytimg.com/vi/D6yUJLSocUU/maxresdefault.jpg",
    video:"D6yUJLSocUU",
    doctor: {
      name: "Madhu Kiran",
      quantity: "Integrative Medicine",
    },
    // name: "Air Pollution",
    description:
      "Air pollution is the introduction of chemicals and other materials into the atmosphere that cause harm to living organisms and the natural environment.",
  },
  {
    id: 1,
    image: require("images/down.png"),
    link: "https://i.ytimg.com/vi/jVzSooEyI6k/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA2ubqQEp-dVbtoZgUhEOCTyiXqCA",
    video:"jVzSooEyI6k",
    doctor: {
      name: "Vincent A",
      quantity: "Integrative Medicine",
    },
    // name: "Taminflu",
    description:
      "Air pollution is the introduction of chemicals and other materials into the atmosphere that cause harm to living organisms and the natural environment.",
  },
  {
    id: 2,
    image: require("images/down.png"),
    link: "https://i.ytimg.com/vi/jI3c6A3DAag/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDL-ezwAJMf8BRnnZSQZZe_ZLiL8Q",
    video:"jI3c6A3DAag",
    doctor: {
      name: "Elements of Financial wellness",
      quantity: "Elements of Financial Education",
    },
    // name: "Taminflu",
    description:
      "Air pollution is the introduction of chemicals and other materials into the atmosphere that cause harm to living organisms and the natural environment.",
  },
];

export const QUIZ_QUESTIONS = [
  {"id":15,"surveyId":2,"sectionId":3,"title":"Q1","question":"Type of Business","inputType":"Select","options":[{"id":1,"value":"Manufacturing"},{"id":2,"value":"Trading"},{"id":3,"value":"Services"}],"isMandatory":true,"sectionName":"Business Financial Health Check"},
]

 export const HEALTH_FEED_DATA = [
//   {
//     id: 0,
//     subTitle: "Health Tip",
//     title: "Quitting smoking",
//     name: "Dr.Sarah Conner",
//     avatar: AVATAR.sarah,
//     image: IMAGE.cigarette,
//     action: "shared",
//     thanks: 12500,
//     shares: 1200,
//     quantity: "Integrative Medicine",
//     shareOn: "Air Pollotion",
//     subDescription:
//       "Quitting smoking is the process of discontinuing the use of inhaled tobacco products.",
//     description:
//       "Quitting smoking is the process of discontinuing the use of inhaled tobacco products.\n\nInteresting Fact: Smoking is the number one cause of preventable death in the United States.",
//   },
 ];

export const NEW_CONSULTS_DATA = [
  {
    id: 0,
    question: `Please provide some do's and don'ts for people who are sick with the flu or a cold.`,
    numberOfAnswers: 12,
    doctor: {
      name: "Sandra Klevins",

    },
    image: require("images/down.png"),
    answer: `Always use your own pen at the doctor's office and not the pen 100's of infected patients touched.`,
  },
];

export const FEATURE = [
  {
    icon: SOURCE_ICON.whiteAdditional,
    title: "Overview",
    //route: Routes.
  },
  {
    icon: SOURCE_ICON.whiteCondition,
    title: "Conditions & Symptoms",
    route: Routes.TopicDetailConditions,
  },
  {
    icon: SOURCE_ICON.whiteMedication,
    title: "Medications",
    //route: Routes.
  },
  {
    icon: SOURCE_ICON.procedure,
    title: "Procedures",
    //route: Routes.
  },
  {
    icon: SOURCE_ICON.healthGuide,
    title: "Health Guide",
    //route: Routes.
  },
];

export const DATA_CONDITIONS = [
  "Muscle Pain",
  "Heart diseases",
  "Asthma",
  "Low back pain, better with bending forward",
];

export const LIST_DOCTOR_DATA = [
  
];

export const PRIVATE_CHAT = [
  
];

// add Quiz Questions
export const QUIZQUESTIONS = [
  {
    id: "1",
    question: "We should keep our savings with banks because",
    answers: [
      { id: "1", text: "It is safe",correct: false  },
      { id: "2", text: "Earns interest",correct: false  },
      { id: "3", text: "Can be withdrawn anytime",correct: false  },
      { id: "4", text: "All of above", correct: true }
    ]
  },
  {
    id: "2",
    question: "ATM password to be shared only with",
    answers: [
      { id: "1", text: "Spouse",correct: false  },
      { id: "2", text: "Obedient son",correct: false  },
      { id: "3", text: "Obedient daughter",correct: false  },
      { id: "4", text: "None of above", correct: true }
    ]
  },
  {
    id: "3",
      question: "KYC means",
      answers: [
        { id: "1", text: "Know your customer", correct: true },
        { id: "2", text: "Know your character",correct: false  },
        { id: "3", text: "Both of above",correct: false  },
        { id: "4", text: "None of above",correct: false  }
      ]
    },
    {
      id: "4",
      question: "Loans from money lenders are",
      answers: [
        { id: "1", text: "With High rate of interest",correct: false  },
        { id: "2", text: "No proper accounting",correct: false  },
        { id: "3", text: "No transparency",correct: false  },
        { id: "4", text: "All of above", correct: true }
      ]
    },
    {
      id: "5",
      question: "Life insurance means",
      answers: [
        { id: "1", text: "Insurance of human", correct: true },
        { id: "2", text: "Insurance of life of human and Cattle",correct: false  },
        { id: "3", text: "Insurance of Life of Machines",correct: false  },
        { id: "4", text: "All of above",correct: false  }
      ]
    },
    {
      id: "6",
      question: "General Insurance relates to insurance against",
      answers: [
        { id: "1", text: "Fire",correct: false  },
        { id: "2", text: "Theft",correct: false  },
        { id: "3", text: "Burglary",correct: false  },
        { id: "4", text: "All of above", correct: true }
      ]
    },
    {
      id: "7",
      question: "Bank provides loans for",
      answers: [
        { id: "1", text: "Home",correct: false  },
        { id: "2", text: "Car",correct: false  },
        { id: "3", text: "Education",correct: false  },
        { id: "4", text: "All of above", correct: true }
      ]
    },
    {
      id: "8",
      question: "Which currency note has security thread?",
      answers: [
        { id: "1", text: "Rs.50/-",correct: false  },
        { id: "2", text: "Rs.100/-",correct: false  },
        { id: "3", text: "Rs.500/-",correct: false  },
        { id: "4", text: "All of above", correct: true }
      ]
    },
    {
      id: "9",
      question: "The safest place for keeping money",
      answers: [
        { id: "1", text: "A pit dug in the ground",correct: false  },
        { id: "2", text: "An iron box",correct: false  },
        { id: "3", text: "Bank", correct: true },
        { id: "4", text: "Money lender",correct: false  }
      ]
    },
    {
      id: "10",
      question: "Gold and silver ornaments should be kept in bank lockers",
      answers: [
        { id: "1", text: "It is safe",correct: false  },
        { id: "2", text: "No risk of theft",correct: false  },
        { id: "3", text: "Both (a) & (b)", correct: true },
        { id: "4", text: "None of above",correct: false  }
      ]
    },
    {
      id: "11",
      question: "Bank Pass Book is",
      answers: [
        { id: "1", text: "Issued by Bank",correct: false  },
        { id: "2", text: "Is Transaction details of Bank A/c",correct: false  },
        { id: "3", text: "Shows balance in account",correct: false  },
        { id: "4", text: "All of above", correct: true }
      ]
    },
    {
      id: "12",
      question: "Banks pays interest on",
      answers: [
        { id: "1", text: "Deposits", correct: true },
        { id: "2", text: "Loans",correct: false  },
        { id: "3", text: "Both (a) & (b)",correct: false  },
        { id: "4", text: "None of above",correct: false  }
      ]
    },
    {
      id: "13",
      question: "Bank charges interest on",
      answers: [
          { id: "1", text: "Deposits",correct: false  },
          { id: "2", text: "Loans", correct: true },
          { id: "3", text: "Both (a) & (b)",correct: false  },
          { id: "4", text: "None of above",correct: false  }
      ]
    },
    {
      id: "14",
      question: "Internet banking refers to",
      answers: [
        { id: "1", text: "Operation of A/c through internet", correct: true },
        { id: "2", text: "Opening of A/c through ATM",correct: false  },
        { id: "3", text: "Both (a) & (b)",correct: false  },
        { id: "4", text: "None of above",correct: false  }
      ]
    },
    {
      id: "15",
      question: "In Recurring Deposits,",
      answers: [
        { id: "1", text: "Monthly fixed sum is deposited",correct: false  },
        { id: "2", text: "Period of deposit is a fixed tenure",correct: false  },
        { id: "3", text: "Interest is paid at FDR rate",correct: false  },
        { id: "4", text: "All of above", correct: true }
      ]
    },
    {
      id: "16",
      question: "ATM can be used for",
      answers: [
        { id: "1", text: "Cash withdrawal",correct: false  },
        { id: "2", text: "Account enquiry",correct: false  },
        { id: "3", text: "Statement of account",correct: false  },
        { id: "4", text: "All of above", correct: true }
      ]
    },
    {
      id: "17",
      question: "What is RuPay Debit Card?",
      answers: [
        { id: "1", text: "Domestic debit card",correct: false  },
        { id: "2", text: "Introduced by NPCI",correct: false  },
        { id: "3", text: "Accepted at all ATMs & PoS",correct: false  },
        { id: "4", text: "All of above", correct: true }
      ]
    },
    {
      id: "18",
      question: "Aadhaar is",
      answers: [
        { id: "1", text: "12 digit number card",correct: false  },
        { id: "2", text: "Identity proof issued by UIDAI",correct: false  },
        { id: "3", text: "Both (a) & (b)", correct: true },
        { id: "4", text: "None of above",correct: false  }
      ]
    },
    {
      id: "19",
      question: "PAN means",
      answers: [
        { id: "1", text: "A kind of utensil",correct: false  },
        { id: "2", text: "Primary Account Number",correct: false  },
        { id: "3", text: "Permanent Account Number", correct: true },
        { id: "4", text: "None of above",correct: false  }
      ]
    }
];

