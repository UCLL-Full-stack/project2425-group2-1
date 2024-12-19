import database from '../util/database';
import { Member } from '../model/member';
import { Profile } from '../model/profile';
import { Payment } from '../model/payment';
import { Membership } from '../model/membership';
import { Attendance } from '../model/attendance';
import { MemberInput } from '../types';
import bcrypt from 'bcrypt';

const getUserByUsername = async ({ username }: { username: string }): Promise<Member | null> => {
    try {
        const memberPrisma = await database.member.findUnique({
            where: { username },
            include: {
                profile: true,
                payments: true,
                membership: true,
                attendance: true, // Include attendance in the result
            },
        });

        return memberPrisma ? Member.from(memberPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Get all members with related data
const getAllMembers = async (): Promise<Member[]> => {
    try {
        const membersPrisma = await database.member.findMany({
            include: {
                profile: true,
                payments: true,
                membership: true, // Corrected to 'membership' (singular)
                attendance: true, // Include attendance
            },
        });
        return membersPrisma.map((memberPrisma) => Member.from(memberPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Create a new member with related data
const createMember = async (memberData: MemberInput): Promise<Member> => {
    const {
        username,
        email,
        phoneNumber,
        password,
        role,
        profile,
        payment,
        membership,
        attendance,
    } = memberData;

    try {
        const memberPrisma = await database.member.create({
            data: {
                username,
                email,
                phoneNumber,
                password,
                role,
                ...(profile && { profile: { create: profile } }), // Create profile
                ...(membership && { membership: { create: membership } }), // Create membership
                payments: {
                    create: payment.map((p) => ({
                        amount: p.amount,
                        date: p.date,
                        dueDate: p.dueDate,
                        paymentStatus: p.paymentStatus,
                    })),
                },
                attendance: attendance
                    ? {
                          create: attendance.map((a) => ({
                              attendance_tracking: a.attendance_tracking,
                              trainerId: a.trainerId,
                          })),
                      }
                    : undefined, // Optionally create attendance if provided
            },
            include: {
                profile: true,
                payments: true,
                membership: true,
                attendance: true, // Include attendance in the result
            },
        });

        return Member.from(memberPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Get a member by ID with related data
const getMemberById = async ({ id }: { id: number }): Promise<Member | null> => {
    try {
        const memberPrisma = await database.member.findUnique({
            where: { id },
            include: {
                profile: true,
                payments: true,
                membership: true,
                attendance: true, // Include attendance in the result
            },
        });

        return memberPrisma ? Member.from(memberPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Update a member's details
const updateMember = async (id: number, memberData: MemberInput): Promise<Member> => {
    const {
        username,
        email,
        phoneNumber,
        password,
        role,
        profile,
        payment,
        membership,
        attendance,
    } = memberData;

    // Default `attendance` to an empty array if not provided
    const attendanceData = attendance || [];

    try {
        const updatedMemberPrisma = await database.member.update({
            where: { id },
            data: {
                username,
                email,
                phoneNumber,
                password,
                role,
                ...(profile && { profile: { update: profile } }), // Update profile if passed
                membership: { update: membership }, // Always update membership
                payments: {
                    deleteMany: {}, // Optionally delete existing payments (if needed)
                    create: payment.map((p) => ({
                        amount: p.amount,
                        date: p.date,
                        dueDate: p.dueDate,
                        paymentStatus: p.paymentStatus,
                    })),
                },
                attendance:
                    attendanceData.length > 0 // Check if there is any attendance data
                        ? {
                              update: attendanceData.map((a) => ({
                                  where: { id: a.id }, // Ensure attendance has an 'id' field
                                  data: {
                                      attendance_tracking: a.attendance_tracking,
                                      trainerId: a.trainerId,
                                  },
                              })),
                          }
                        : undefined, // Update attendance if provided
            },
            include: {
                profile: true,
                payments: true,
                membership: true,
                attendance: true, // Include attendance in the result
            },
        });

        return Member.from(updatedMemberPrisma);
    } catch (error) {
        console.error(error);
        throw new Error(`Error updating member: ${error}`);
    }
};

export default {
    getAllMembers,
    createMember,
    getMemberById,
    updateMember,
    getUserByUsername,
};
