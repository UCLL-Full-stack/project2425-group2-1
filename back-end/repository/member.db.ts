import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Member } from '../model/member';
import { Payment } from '../model/payment';
import { Profile } from '../model/profile';

const prisma = new PrismaClient();

// Function to get all members
const getAllMembers = async (): Promise<Member[]> => {
    const members = await prisma.member.findMany({
        include: {
            profile: true,
            payments: true,
        },
    });
    return members.map(mapToMember);
};

// Function to check if a username is unique
const isUsernameUnique = async (username: string): Promise<boolean> => {
    const member = await prisma.member.findUnique({
        where: { username },
    });
    return member === null;
};

// Function to add a new member
const addMember = async (newMember: Member): Promise<Member> => {
    const hashedPassword = await bcrypt.hash(newMember.getPassword(), 10);
    const createdMember = await prisma.member.create({
        data: {
            username: newMember.getUsername(),
            email: newMember.getEmail(),
            phoneNumber: newMember.getPhoneNumber(),
            password: hashedPassword,
            profile: {
                create: {
                    name: newMember.getProfile().getName(),
                    surname: newMember.getProfile().getSurname(),
                    height: newMember.getProfile().getHeight(),
                    weight: newMember.getProfile().getWeight(),
                },
            },
            payments: {
                create: newMember.getPayments().map((payment) => ({
                    amount: payment.getAmount(),
                    date: payment.getDate(),
                    dueDate: payment.getDueDate(),
                    paymentStatus: payment.getPaymentStatus(),
                })),
            },
        },
        include: {
            profile: true,
            payments: true,
        },
    });
    return mapToMember(createdMember);
};

// Function to get a member by ID
const getMemberById = async (id: number): Promise<Member | null> => {
    const member = await prisma.member.findUnique({
        where: { id },
        include: {
            profile: true,
            payments: true,
        },
    });
    return member ? mapToMember(member) : null;
};

// Function to update a member
const updateMember = async (updatedMember: Member): Promise<Member> => {
    const hashedPassword = updatedMember.getPassword()
        ? await bcrypt.hash(updatedMember.getPassword(), 10)
        : undefined;
    const updated = await prisma.member.update({
        where: { id: updatedMember.getId() },
        data: {
            username: updatedMember.getUsername(),
            email: updatedMember.getEmail(),
            phoneNumber: updatedMember.getPhoneNumber(),
            password: hashedPassword,
            profile: {
                update: {
                    name: updatedMember.getProfile().getName(),
                    surname: updatedMember.getProfile().getSurname(),
                    height: updatedMember.getProfile().getHeight(),
                    weight: updatedMember.getProfile().getWeight(),
                },
            },
            payments: {
                deleteMany: {},
                create: updatedMember.getPayments().map((payment) => ({
                    amount: payment.getAmount(),
                    date: payment.getDate(),
                    dueDate: payment.getDueDate(),
                    paymentStatus: payment.getPaymentStatus(),
                })),
            },
        },
        include: {
            profile: true,
            payments: true,
        },
    });
    return mapToMember(updated);
};

// Helper function to map Prisma member to Member model
const mapToMember = (member: any): Member => {
    return new Member({
        id: member.id,
        username: member.username,
        email: member.email,
        phoneNumber: member.phoneNumber,
        password: member.password,
        profile: new Profile({
            id: member.profile.id,
            name: member.profile.name,
            surname: member.profile.surname,
            height: member.profile.height,
            weight: member.profile.weight,
        }),
        payments: member.payments.map(
            (payment: any) =>
                new Payment({
                    id: payment.id,
                    amount: payment.amount,
                    date: payment.date,
                    dueDate: payment.dueDate,
                    paymentStatus: payment.paymentStatus,
                })
        ),
    });
};

// Exporting functions for use in other modules
export default {
    getMemberById,
    isUsernameUnique,
    addMember,
    getAllMembers,
    updateMember,
};
