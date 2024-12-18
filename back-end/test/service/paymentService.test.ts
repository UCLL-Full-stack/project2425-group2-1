// // paymentMember.test.ts
// import { Member } from '../../model/member';
// import { Payment } from '../../model/payment';
// import { Profile } from '../../model/profile';

// // Test for Payment class
// test('given: valid values for payment, when: payment is created, then: payment is created with those values', () => {
//     // given
//     const paymentData = { amount: 100, date: new Date('2024-10-01'), dueDate: new Date('2024-10-31'), paymentStatus: true };

//     // when
//     const payment = new Payment(paymentData);

//     // then
//     expect(payment.getAmount()).toEqual(paymentData.amount);
//     expect(payment.getDate()).toEqual(paymentData.date);
//     expect(payment.getDueDate()).toEqual(paymentData.dueDate);
//     expect(payment.getPaymentStatus()).toEqual(paymentData.paymentStatus);
// });

// test('given: a payment that is overdue, when: checked for overdue, then: it should return true', () => {
//     // given
//     const paymentData = { 
//         amount: 100, 
//         date: new Date('2024-01-01'), // Set a past date for the payment date
//         dueDate: new Date('2024-10-01'), // Set a past due date
//         paymentStatus: false // Not paid
//     };
//     const payment = new Payment(paymentData);

//     // when
//     const isOverdue = payment.isOverdue();

//     // then
//     expect(isOverdue).toBe(true); // Payment is overdue
// });


// test('given: a payment that is overdue, when: checked for overdue, then: it should return true', () => {
//     // given
//     const paymentData = { amount: 100, date: new Date('2024-01-01'), dueDate: new Date('2024-10-01'), paymentStatus: false };
//     const payment = new Payment(paymentData);

//     // when
//     const isOverdue = payment.isOverdue();

//     // then
//     expect(isOverdue).toBe(true); // Overdue
// });

// test('given: two identical payments, when: checked for equality, then: they are equal', () => {
//     // given
//     const paymentData = { amount: 100, date: new Date('2024-10-01'), dueDate: new Date('2024-10-31'), paymentStatus: true };
//     const payment1 = new Payment(paymentData);
//     const payment2 = new Payment(paymentData);

//     // when
//     const isEqual = payment1.equals(payment2);

//     // then
//     expect(isEqual).toBe(true);
// });

// // Test for Member class
// test('given: valid values for member, when: member is created, then: member is created with those values', () => {
//     // given
//     const profile = new Profile({ name: "John", surname: "Doe", height: 180, weight: 75 });
//     const payment = new Payment({ amount: 100, date: new Date(), dueDate: new Date(), paymentStatus: true });
//     const memberData = {
//         username: "john_doe",
//         email: "johndoe@example.com",
//         phoneNumber: "0475829054",
//         password: "SecurePassword@1",
//         profile: profile,
//         payment: [payment]
//     };

//     // when
//     const member = new Member(memberData);

//     // then
//     expect(member.getUsername()).toEqual(memberData.username);
//     expect(member.getEmail()).toEqual(memberData.email);
//     expect(member.getPhoneNumber()).toEqual(memberData.phoneNumber);
//     expect(member.getProfile()).toEqual(profile);
//     expect(member.getPayments()).toEqual([payment]); // Verify payments
// });

// test('given: a member, when: a payment is added, then: the member has that payment', () => {
//     // given
//     const profile = new Profile({ name: "John", surname: "Doe", height: 180, weight: 75 });
//     const member = new Member({
//         username: "john_doe",
//         email: "johndoe@example.com",
//         phoneNumber: "0475829054",
//         password: "SecurePassword@1",
//         profile: profile
//     });

//     const payment = new Payment({ amount: 100, date: new Date(), dueDate: new Date(), paymentStatus: true });

//     // when
//     member.addPayment(payment);

//     // then
//     expect(member.getPayments()).toContain(payment);
// });

// test('given: two identical members, when: checked for equality, then: they are equal', () => {
//     // given
//     const profile = new Profile({ name: "John", surname: "Doe", height: 180, weight: 75 });
//     const member1 = new Member({
//         username: "john_doe",
//         email: "johndoe@example.com",
//         phoneNumber: "0475829054",
//         password: "SecurePassword@1",
//         profile: profile
//     });

//     const member2 = new Member({
//         username: "john_doe",
//         email: "johndoe@example.com",
//         phoneNumber: "0475829054",
//         password: "SecurePassword@1",
//         profile: profile
//     });

//     // when
//     const isEqual = member1.equals(member2);

//     // then
//     expect(isEqual).toBe(true);
// });
