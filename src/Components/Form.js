import React, {useState} from 'react'
import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom'

export const Form = () =>{

    const [name, setName] = useState('')
    const history = useHistory()

    const handleSubmit = (e) =>{
            e.preventDefault()
            if(!name.trim()){
                alert(`Name can't be empty`)
            } else if(name.match('/^[A-Za-z]+$/')){
                alert('Name can only contain alphabets')
            }else{
                Cookies.set('name', name ,{expires: 7})
                history.push('/quiz')
            }
        } 

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label id="nameLabel" htmlFor="name">Enter Your Name :</label>
            <input type="text" autoFocus={true} id="name" value={name} placeholder="Your name" onChange={(e)=> setName(e.target.value)}/>
            <button className="next">Submit</button>
        </form>
    )
}