'use client'

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"

const EditTaskPage = ({params}) => {
    const {id} = use(params)
    const [title, setTitle] = useState('')
    const router = useRouter()

    useEffect(() => {
        const fetchTask = async () => {
            const respone = await fetch(`/api/tasks/${id}`);
            if(!respone.ok) {
                console.error('Failed to fetch task');
                return
            }
            const data = await respone.json()
            setTitle(data.title)
        }
        fetchTask()
    }, [id])

    const handleSubmit = async(event) => {
        event.preventDefault();

        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({title}),
        });

        if(response.ok){
            router.push('/');
        } else {
            alert('Failed to update task');
        }
    }

    return (
        <div>
            <h1 style={{textAlign: 'center', marginBottom: '1rem'}}>Edit Task</h1>
            <form onSubmit={handleSubmit}>
                <input style={{height: '35px'}} type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
                <button style={{height: '35px', padding: '0 1rem', background:'green'}} type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditTaskPage;