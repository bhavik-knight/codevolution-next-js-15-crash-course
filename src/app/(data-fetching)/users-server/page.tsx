import axios from "axios";
import { DataUser } from "../user-interface";

export default async function UsersServer() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  const users: Array<DataUser> = response.data;

  return (
    <ul className="space-y-4 p-4">
      {users.map((user: DataUser) => (
        <li
          key={user.id}
          className="p-4 text-pink-100 shadow-md rounded-md bg-blue-500"
        >
          {user.name} [{user.username}] : {user.email}, {user.phone}
        </li>
      ))}
    </ul>
  );
}
