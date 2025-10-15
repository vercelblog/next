"use client"

import React, { useEffect, useState } from 'react'
import { deleteComment, getComments } from '../api/api'

const page = () => {
    const [ comment , setComment ] = useState([]);
    useEffect(()=>{
        fetchcomments()
    },[])

    const fetchcomments = async () => {
        const res = await getComments()
        setComment(res.data.comments || []);
    }

    const HandleDelete = async (id) => {
        const res = await deleteComment(id)
        console.log(res)
        fetchcomments()
    }
  return (
    <div className='py-4 px-6'>
        {comment.map((c,i)=>(
            <div key={i} className='m-2 '>
                <p className='text-gray-400'>{c.username}</p>
                <p className='text-gray-500'>{c.email}</p>
                <p className='text-xl text-green-700'>{c.text}</p>
                <p onClick={()=>HandleDelete(c._id)} className='text-red-500 text-end'>Delete</p>
            </div>
        ))}
    </div>
  )
}

export default page