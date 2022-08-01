import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserDetails } from "../../services/userService";

const UsersView = () => {

  const[users, setUsers] = useState<any[]>([])
  const navigate = useNavigate()

  const getAllUsers = useCallback(async () => {
    try {
      const { data } = await getUserDetails();
      setUsers(data);
    } catch (err) {}
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div id="adminViews">
       <div className="top">
        <h3 className="tableName">Users</h3>
      </div>
      <div className="tableArea">
        <table>
          <thead>
            <tr>
              <th>Users ID</th>
              <th>Users Name</th>
              <th>User Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map?.((loc: any, idx) => (
              <tr key={idx} 
              onClick={()=>navigate(`users/${loc?.id}`)}
              >
                <td>{loc?.id}</td>
                <td>{loc?.name}</td>
                <td>{loc?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersView