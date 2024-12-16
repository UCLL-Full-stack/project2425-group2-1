import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    // Delete existing data
    await prisma.payment.deleteMany();
    await prisma.member.deleteMany(); // Delete members first to avoid foreign key constraint issues
    await prisma.profile.deleteMany(); // Then delete profiles

    // Create members with profiles and payments
    const member1 = await prisma.member.create({
        data: {
            username: 'XxX_ibench225_XxX',
            email: 'randomahhemail@gmail.com',
            phoneNumber: '0475829054',
            password: 'H4j1u421@1', // Plain text password for seeding
            profile: {
                create: {
                    name: 'John',
                    surname: 'Smith',
                    height: 154,
                    weight: 50,
                },
            },
            payments: {
                create: [
                    {
                        amount: 50,
                        date: new Date('2024-01-15'),
                        dueDate: new Date('2024-02-15'),
                        paymentStatus: true,
                    },
                    {
                        amount: 75,
                        date: new Date('2024-02-10'),
                        dueDate: new Date('2024-03-10'),
                        paymentStatus: false,
                    },
                ],
            },
        },
    });

    const member2 = await prisma.member.create({
        data: {
            username: 'WifelessWarrior',
            email: 'idk@gmail.com',
            phoneNumber: '0403892754',
            password: 'Ba21#@Password2', // Plain text password for seeding
            profile: {
                create: {
                    name: 'Bla',
                    surname: 'Smith',
                    height: 123,
                    weight: 60,
                },
            },
            payments: {
                create: [
                    {
                        amount: 100,
                        date: new Date('2024-03-20'),
                        dueDate: new Date('2024-04-20'),
                        paymentStatus: true,
                    },
                ],
            },
        },
    });

    console.log('Seeded members:', member1, member2);
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
