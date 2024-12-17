// seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Delete existing data
    await prisma.payment.deleteMany();
    await prisma.member.deleteMany(); // Delete members first to avoid foreign key constraint issues
    await prisma.profile.deleteMany(); // Then delete profiles
    await prisma.membership.deleteMany(); // Then delete memberships
    await prisma.trainer.deleteMany(); // Delete trainers
    await prisma.attendance.deleteMany(); // Delete attendances

    // Create members with profiles and payments
    const member1 = await prisma.member.create({
        data: {
            username: 'XxX_ibench225_XxX',
            email: 'randomahhemail@gmail.com',
            phoneNumber: '0475829054',
            password: await bcrypt.hash('H4j1u421@1', 10), // Hash password for seeding
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
            membership: {
                create: {
                    start_date: new Date('2024-01-01'),
                    end_date: new Date('2024-12-31'),
                    membership_type: 'Yearly',
                },
            },
        },
    });

    const member2 = await prisma.member.create({
        data: {
            username: 'WifelessWarrior',
            email: 'idk@gmail.com',
            phoneNumber: '0403892754',
            password: await bcrypt.hash('Ba21#@Password2', 10), // Hash password for seeding
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
            membership: {
                create: {
                    start_date: new Date('2024-03-01'),
                    end_date: new Date('2024-05-31'),
                    membership_type: 'Quarterly',
                },
            },
        },
    });

    // Create trainers
    const trainer1 = await prisma.trainer.create({
        data: {
            name: 'John Doe',
            availability: 'Monday, Wednesday, Friday',
            language_known: 'English, Spanish',
        },
    });

    const trainer2 = await prisma.trainer.create({
        data: {
            name: 'Jane Smith',
            availability: 'Tuesday, Thursday, Saturday',
            language_known: 'English, French',
        },
    });

    // Create attendances
    const attendance1 = await prisma.attendance.create({
        data: {
            attendance_tracking: 'Attended session on 2024-01-15',
            
            memberId: [member1.id],
            members: {
                connect: [{ id: member1.id }],
            },
            trainerId: [trainer1.id],
            trainers: {
                connect: [{ id: trainer1.id }],
            },
        },
    });

    const attendance2 = await prisma.attendance.create({
        data: {
            attendance_tracking: 'Attended session on 2024-01-16',
                memberId: [member2.id],
            members: {
                connect: [{ id: member2.id }],
            },
            trainerId: [trainer2.id],
            trainers: {
                connect: [{ id: trainer2.id }],
            },
        },
    });

    console.log('Seeded members:', member1, member2);
    console.log('Seeded trainers:', trainer1, trainer2);
    console.log('Seeded attendances:', attendance1, attendance2);
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
