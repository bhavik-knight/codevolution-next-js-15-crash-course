export interface User {
    id: number;
    name: string;
    age: number;
}


export const users: Array<User> = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Doe", age: 14 }
];
