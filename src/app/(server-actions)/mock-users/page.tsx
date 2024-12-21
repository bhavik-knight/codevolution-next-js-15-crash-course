import axios from "axios";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

export interface MockUser {
  id: number;
  name: string;
}

export default async function MockUsers() {
  const authObj = await auth();
  const userObj = await currentUser();
  console.log(
    `Auth object: ${JSON.stringify(authObj)}\nUser Object: ${JSON.stringify(
      userObj
    )}`
  );

  console.log(authObj, userObj);

  const response = await axios.get(
    "https://676660f9410f8499965780b2.mockapi.io/users"
  );
  const users: Array<MockUser> = response.data;

  // server actions: Form to Add data to the server in a secure way
  async function addUser(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const response = await axios.post(
      "https://676660f9410f8499965780b2.mockapi.io/users",
      { name: name },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const newUser = await response.data;
    revalidatePath("/mock-users");
    console.log(`New User: ${JSON.stringify(newUser)}`);
  }

  return (
    <div className="p-10">
      <form className="m-4" action={addUser}>
        <input
          type="text"
          name="name"
          required
          className="border text-black p-2 m-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white m-2 p-2 rounded"
        >
          Add User
        </button>
      </form>
      <div className="list-none grid grid-cols-4 gap-4 m-4 p-4">
        {users.map((user: MockUser) => (
          <div
            key={user.id}
            className="m-2 p-2 bg-blue-900 text-purple-300 rounded-lg shadow-md"
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}
