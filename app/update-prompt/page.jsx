"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Form from '@components/Form'


const EditPrompt = () => {

  const searchParams =  useSearchParams();
  const promptId = searchParams.get('id');
  const router = useRouter();
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    })

    useEffect(()=>{
        const getPromptDetails = async ()=>{

          try {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag:data.tag,
            })
          } catch (error) {
            console.log(error)
          }
            
        }

        if(promptId)
        {
            getPromptDetails();
        }
    },[promptId])

    const updatePrompt = async(e)=>{
      e.preventDefault();
      setSubmitting(true)

      if(!promptId) return alert("PromtId Not Found!");

      try {
        const response = await fetch(`/api/prompt/${promptId}`, {
          method:"PATCH",
          body: JSON.stringify({
            prompt:post.prompt,
            tag:post.tag
          })
        })

        if(response.ok)
        {
          router.push('/')
        }
      } catch (error) {
        console.log(error)
      }finally{
        setSubmitting(false)
      }
    }

  return (
    <Form 
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt