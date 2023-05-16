import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import deleteIMG from "../Images/delete.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = () => {

    const [notes, setNotes] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        GetNotes()
    },[])

    const GetNotes = async () => {
    
        const response = await fetch("http://localhost:1447/api/getnotes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json()
        console.log(data.data)
        if (data.status === "success") {
            setNotes(data.data)
        } else {
            toast.error(data.message)
        }
    }

    const deleteNote = async (userId) => {
        const response = await fetch(`http://localhost:1447/api/notes/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const answer = await response.json();
        console.log(answer)
        if (answer.status === "success") {
            const newData = notes.filter(item => item._id !== userId);
            setNotes(newData)
            toast.success(answer.message)
        }
        else {
            toast.error(answer.message)
        }
    }

    

    return (
        <div className="flex bgImg bg-fixed min-h-screen px-10 py-10">
            <ToastContainer />
            <div className='w-full h-full grid grid-cols-12 gap-x-20 gap-y-10'>
                {notes.length > 0? 
                    <>
                        {notes.map((value, index)=>{
                            return(
                                <div onClick={()=>{navigate(`/add/${value._id}`)}} key={index} className='h-64 hj col-span-4 bg-yellow-100 rounded'>
                                    <div className="w-full rounded-t grid grid-cols-12 h-7 bg-yellow-100">
                                        <div  className="spacegrotesk py-2 px-4 col-span-10 rounded-tl-2xl h-full outline-none  text-center placeholder-black bg-yellow-100 flex items-center justify-center rounded text-black tracking-widest text-base">{value.title}</div>
                                        <button onClick={(event)=>{event.stopPropagation(); deleteNote(value._id)}} className="h-full hover:bg-yellow-300 py-2 col-span-2 rounded-tl rounded-tr cursor-pointer text-sm bg-yellow-200  text-black  items-center justify-center flex"><img alt="delete" className='h-7' src={deleteIMG}/></button>
                                    </div>
                                    <div className="lato max-h-fit rounded-b whitespace-pre-line bg-yellow-100 text-base  flex w-full px-5 py-5" >
                                        {value.note}
                                    </div>
                                </div>
                            )
                            
                        })}
                    </>
                :
                    <></>}
                
                
            </div>
            <div className="fixed bottom-6 right-6">
                <button onClick={()=>{navigate("/add")}} className="bg-green-600 hover:bg-green-700 lato text-white text-2xl font-bold py-2 px-4 rounded">
                    +
                </button>
            </div>

        </div>
    );
}
 
export default Homepage;