import { PrismaClient } from '@prisma/client';
import { set } from 'date-fns';
import { Attendance } from '../model/attendance';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.payment.deleteMany();
    await prisma.member.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.trainer.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.membership.deleteMany(); 

    // 1. Create Profiles first
    const profile1 = await prisma.profile.create({
        data: {
            name: 'John',
            surname: 'Smith',
            height: 154,
            weight: 50,
        },
    });

    const profile2 = await prisma.profile.create({
        data: {
            name: 'Bla',
            surname: 'Smith',
            height: 123,
            weight: 60,
        },
    });

    // 4. Create Memberships
    const membership1 = await prisma.membership.create({
        data: {
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-31'),
            type: 'monthly',
        },
    });

    const membership2 = await prisma.membership.create({
        data: {
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-12-31'),
            type: 'yearly',
        },
    });

    // 2. Create Members and connect to the previously created Profiles
    const member1 = await prisma.member.create({
        data: {
            username: 'XxX_ibench225_XxX',
            email: 'randomahhemail@gmail.com',
            phoneNumber: '0475829054',
            password: 'Password@1',
            profile: { connect: { id: profile1.id } }, // Connect the created profile to member1
            membership: { connect: { id: membership1.id } }, // Connect the created membership to member1
        },
    });

    const member2 = await prisma.member.create({
        data: {
            username: 'WifelessWarrior',
            email: 'idk@gmail.com',
            phoneNumber: '0403892754',
            password: 'Secure@Password2',
            profile: { connect: { id: profile2.id } }, // Connect the created profile to member2
            membership: { connect: { id: membership2.id } }, // Connect the created membership to member2
        },
    });

    // 3. Create Payments and connect to Members
    const payment1a = await prisma.payment.create({
        data: {
            amount: 50,
            date: new Date('2024-01-15'),
            dueDate: new Date('2024-02-15'),
            paymentStatus: true,
            memberId: member1.id, // Connect payment to member1
        },
    });

    const payment1b = await prisma.payment.create({
        data: {
            amount: 75,
            date: new Date('2024-02-10'),
            dueDate: new Date('2024-03-10'),
            paymentStatus: false,
            memberId: member1.id, // Connect payment to member1
        },
    });

    const payment2 = await prisma.payment.create({
        data: {
            amount: 100,
            date: new Date('2024-03-20'),
            dueDate: new Date('2024-04-20'),
            paymentStatus: true,
            memberId: member2.id, // Connect payment to member2
        },
    });

    // 5. Create Trainers
    // Create Trainers
    const trainer1 = await prisma.trainer.create({
        data: {
            name: 'Jane Doe',
            availability: true,
            language_spoken: 'English, Dutch',
        },
    });

    const trainer2 = await prisma.trainer.create({
        data: {
            name: 'John Smith',
            availability: false,
            language_spoken: 'French, English',
        },
    });

    const attendance1 = await prisma.attendance.create({
        data: {
            attendance_tracking: true,
            trainer: {
                connect: [{ id: trainer1.id }, { id: trainer2.id }],
            },
        },
    });

    const attendance2 = await prisma.attendance.create({
        data: {
            attendance_tracking: false,
            trainer: {
                connect: [{ id: trainer1.id }],
            },
        },
    });

    console.log('Data seeding complete!');
};

// 4. Run the script
main()
    .then(async () => {
        await prisma.$disconnect();
        console.log('Seeding complete!');
    })
    .catch(async (e) => {
        console.error('Error while seeding:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
