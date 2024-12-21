import { User, users } from "../route";

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {

    // wait for paramerter id
    const { id } = await params;

    // find user from the users
    const findUser: User | undefined = users.find(user => user.id === parseInt(id));
    // console.log(`Users: ${JSON.stringify(users)}`)

    // return the found user
    if (!findUser) {
        return notFound(id);
    } else {
        return Response.json(findUser);
    }
}


/****************************************************************
 * Difference between PUT & PATCH
 * PUT:     Updates the resource if found, otherwise creates a new resource
 *          Hence all the data must be passed in the request body to be updated
 *          Deletes the data of the original fields if not specified in the request body
 * PATCH: updates the part of resource
 ****************************************************************/
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    // find the user by id parameter
    const { id } = await params;
    const findUser: User | undefined = users.find(user => user.id === parseInt(id));
    console.log(`Found user: ${JSON.stringify(findUser)}`);

    // data in the request body
    const { name, age } = await request.json();

    // update the user's name if found
    if (!findUser) {
        return notFound(id);
    } else {
        // update the name, age
        findUser.name = name;
        findUser.age = age;
        // prepare a new response
        const response = new Response(
            JSON.stringify(`User: ${id} updated successfully, ${JSON.stringify(findUser)}!!`), {
            headers: {
                "Content-type": "application/json"
            },
            status: 200,
        });

        return response;
    }
}



export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    // find the user by id parameter
    const { id } = await params;

    // delete the user whose <id> matches given parameter id
    // first find the user who matches the id
    const findUser = users.find(user => user.id === parseInt(id));

    if (!findUser) {
        return notFound(id);
    } else {
        // fetch the index of this user
        const index = users.indexOf(findUser);
        // remove user
        if (index !== -1) {
            users.splice(index, 1);
            console.log(`Users: ${JSON.stringify(users)}`)
            const response = new Response(
                JSON.stringify(`User[${id}]: ${findUser.name} is deleted successfully!! - User Count: ${users.length} - ${JSON.stringify(users)})}`), {
                headers: {
                    "Content-type": "application/json",
                },
                status: 200,
            });

            return response;
        }
    }
}


function notFound(id: string): Response {
    const response = new Response(
        JSON.stringify(`User with id ${id} not found!!`), {
        headers: {
            "Content-type": "application/json",
        },
        status: 404,
    });
    return response;
}
