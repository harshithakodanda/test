export interface consult {
  id: number;
  status: number;
  time: {
    timeRemaining?: string;
    date: string;
    timeRange?: string;
    receivedTime?: string;
  };
  type: string;
  user: {
    img: number;
    name: string;
    gender: string;
    age: number;
    phone: string;
  };
  details: {
    askFor: string;
    question: string;
    image?: null | {
      uri: any;
      title: string;
      uploadTime: string;
    };
  };
  additionalInformation: {
    diagnosedConditions: {
      value: string;
      time: string;
    };
    medications: string | null;
    allergies: string | null;
  };
}
