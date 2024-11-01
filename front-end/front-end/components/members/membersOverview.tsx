import React from "react";
import { Member } from "@/types";

type Props = {
  members: Array<Member>;
};

const MembersOverview: React.FC<Props> = ({ members }) => {
  return (
    <>
        {members && (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Password</th>
                        <th>Height</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                        <td>{member.id}</td>
                        <td>{member.username}</td>
                        <td>{member.profile.name}</td>
                        <td>{member.profile.surname}</td>
                        <td>{member.email}</td>
                        <td>{member.phoneNumber}</td>
                        <td>{member.password}</td>
                        <td>{member.profile.height}</td>
                        <td>{member.profile.weight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </>
  );
};

export default MembersOverview;
