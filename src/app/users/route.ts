import { users, User } from "./userObject";

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
