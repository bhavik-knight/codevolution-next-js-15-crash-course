export interface User {
    id: number;
    name: string;
    age: number;
}


export const users: Array<User> = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Doe", age: 14 }
];

export async function GET() {
    return Response.json(users);
}

export async function POST(request: Request) {
    // request sent by client - convert to JSON
    const requestedUser = await request.json();

    const newUser: User = {
        id: users.length + 1,
        name: requestedUser.name,
        age: requestedUser.age,
    };

    // add new user to the users
    users.push(newUser);

    // create a new response for the POST, add headers and status for this response
    const response = new Response(
        JSON.stringify(newUser), {
        headers: {
            "Content-type": "application/json",
        },
        status: 201,
    });

    return response;
}
