import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNote = () => {

    const [note, setNote] = useState("")
    const {id}= useParams()
    const [title, setTitle] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        if(id){
            GetCurrentNote()
        }
    },[])

    const SubmitNote = async (e) => {
        e.preventDefault()
        if (!note) {
            toast.error('Please fill all the fields');
        } else {
            if(id){
                EditNote()
            }
            else{
                const response = await fetch("http://localhost:1447/api/notes/create", {
                    method: "POST",
                    //sends the data in json format
                    headers: {
                        "Content-Type": "application/json"
                    },
                    //sends the states to the server
                    body: JSON.stringify({
                        title,
                        note
                    })
                })

                const data = await response.json()
                if (data.status === "success") {
                    toast.success(data.message)
                    setNote("")
                    setTitle("")
                } else {
                    toast.error(data.message)
                }
            }
            
        }
    }
    

    const GetCurrentNote = async () => {
    
        const response = await fetch(`http://localhost:1447/api/getnotes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json()
        if (data.status === "success") {
            setTitle(data.data.title)
            setNote(data.data.note)
        } else {
            toast.error(data.message)
        }
    }

    const EditNote = async (userId) => {
        const response = await fetch(`http://localhost:1447/api/notes/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                note
            })
        })
        const answer = await response.json();
        if (answer.status === "success") {
            toast.success(answer.message)
        }
        else {
            toast.error("There was an error")
        }
    }

    return (
        <div className="flex bgImg justify-center items-center h-screen max-h-fit ">
            <ToastContainer />
            <form onSubmit={(e) => { SubmitNote(e) }} className="w-1/2 rounded bg-yellow-100">
                <div className="w-full rounded-t grid grid-cols-12 h-14 bg-yellow-100">
                    <button onClick={()=>{navigate("/")}} className="h-full hover:bg-yellow-300 col-span-1 rounded-tl rounded-tr cursor-pointer text-base bg-yellow-200  text-black  items-center justify-center flex">{"Back"}</button>
                    <input value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="Your Title Here" className="spacegrotesk px-4 col-span-10 rounded-tl-2xl h-full outline-none  text-center placeholder-black bg-yellow-100 flex items-center justify-center rounded text-black tracking-widest text-lg" />
                    <button type="submit" className="h-full hover:bg-yellow-300 col-span-1 rounded-tl rounded-tr cursor-pointer text-4xl bg-yellow-200  text-black  items-center justify-center flex">+</button>
                </div>

                <textarea value={note} onChange={(e) => { setNote(e.target.value) }} className="h-96 lato max-h-fit rounded-b bg-yellow-100 text-base outline-none  flex w-full px-10 py-10" />
            </form>

        </div>
    );
}

export default AddNote;