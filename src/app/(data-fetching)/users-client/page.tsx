"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataUser } from "../user-interface";

export default function UsersClient() {
  const [users, setUsers] = useState<Array<DataUser>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        console.log(`Users fetched: ${response.data.length}`);
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users data.");
        if (error instanceof Error) {
          setError(`Failed to fetch users: ${error.message}`);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  return (
    <>
      {loading && (
        <div className="bg-blue-900 text-yellow-200">Users are loading </div>
      )}
      {!loading && error && (
        <div className="bg-blue-900 text-red-500">{error}</div>
      )}
      <ul className="space-y-4 p-4">
        {users.map((user: DataUser) => (
          <li
            key={user.id}
            className="p-4 bg-pink-100 shadow-md rounded-md text-blue-500"
          >
            {user.name} [{user.username}] : {user.email}, {user.phone}
          </li>
        ))}
      </ul>
    </>
  );
}
