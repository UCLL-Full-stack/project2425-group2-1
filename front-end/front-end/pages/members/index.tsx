import Header from "@/components/header";
import Head from "next/head";
import Membersoverview from "@/components/members/membersOverview";
import { useEffect, useState } from "react";
import { Member } from "@/types";
import MemberService from "@/services/MemberService";

const Members: React.FC = () => {
    const [members, setMembers] = useState<Array<Member>>([]);
    useEffect(() => {
        getMembers();
    }, []);


    const getMembers = async () => {
        try {
            const memberz = await MemberService.getAllMembers(); 
            setMembers(memberz);
        } catch (error) {
            console.error('Failed to fetch members:', error);
        }
    }

 
    return (
        <>
            <Head>
                <title>Members</title>
            </Head>
            <Header/>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Members</h1>
                <section>
                    {members && (
                        <Membersoverview members={members} />
                    ) }
                </section>
            </main>
        </>
    );
}

export default Members;