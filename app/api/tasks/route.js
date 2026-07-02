import { tasksData as tasks } from "./data";

export async function POST(request) {
    const {title} = await request.json();
    const newTask = {id: Date.now().toString(), title};
    tasks.push(newTask)

    return new Response(JSON.stringify(newTask), {
        status: 201,
        headers: {'Content-Type': 'application/json'},
    });
}


export async function GET() { 
    return new Response(JSON.stringify(tasks), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    })
}