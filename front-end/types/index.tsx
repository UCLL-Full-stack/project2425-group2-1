// types/index.tsx

// Test object of Member
/*{
    "id": 1,
    "username": "XxX_ibench225_XxX",
    "email": "randomahhemail@gmail.com",
    "phoneNumber": "0475829054",
    "password": "Password@1",
    "profile": {
      "id": 1,
      "name": "john",
      "surname": "smith",
      "height": 154,
      "weight": 50
    },
    "payment": [
      {
        "amount": 50,
        "date": "2024-01-15T00:00:00.000Z",
        "dueDate": "2024-02-15T00:00:00.000Z",
        "paymentStatus": true
      },
      {
        "amount": 75,
        "date": "2024-02-10T00:00:00.000Z",
        "dueDate": "2024-03-10T00:00:00.000Z",
        "paymentStatus": false
      }
    ]
  }
*/
export type Member = {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    profile: Profile;
    payment: Payment[];
  };
  
  export type Profile = {
    id: number;
    name: string;
    surname: string;
    height: number;
    weight: number;
  };
  
  export type Payment = {
    amount: number;
    date: Date;
    dueDate: Date;
    paymentStatus: boolean;
  };