import React, { useEffect, useState } from 'react'
import { commentsDash } from '../../../front/src/api/Api.js'

const Comments = () => {
    const [comments,setComments] = useState([]) 
    useEffect(()=>{
        getComments()
    },[])
    const getComments = async () => {
        try {
            const res = await commentsDash()
            setComments(res.data.comments)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='p-4'>
        {comments.map((item)=>(
            <div className='border my-2 p-1'>
                <p>name: {item.username}</p>
                <p>email: {item.email}</p>
                <p>comment: {item.text}</p>
                <p>Time: {item.createdAt}</p>
                <div className='border border-red-500'>{item.replies.map((i)=>(
                    <div>
                    <p>{i.username}</p>
                    <p>{i.text}</p>
                    </div>
                ))}</div>
            </div>
        ))}
    </div>
  )
}

export default Comments