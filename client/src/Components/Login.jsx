import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Login() {
    const props = useLocation().state;

  return (
    <div className='h-full w-full'>
        {props?.login}
    </div>
  )
}
