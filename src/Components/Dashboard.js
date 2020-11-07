import React,{ useState} from 'react'
import Cookies from 'js-cookie'
import {Players} from './Players'
import Clipboard from 'react-clipboard.js'


export const Dashboard = () => {
     const [id] = useState(Cookies.get('id'))
     const [url] = useState(`${window.location.origin}/playquiz/${id}`) 
     const [isCopied, setIsCopied] = useState(false)

     const copied =  () =>{
         setIsCopied(true)
        setTimeout(()=>{
            setIsCopied(false)
        },2000)
     }
    return (
        <>
            {isCopied?<Copied/>: <></>}
            <header>
                <h1>Dashboard</h1>
            </header>
            <div className="copy-content">
                <input type="text" id="copy-link" name="link" disabled value={url}/>
                <Clipboard onClick={()=>copied()} className="copy-button" data-clipboard-text={url}>
                    Copy
                </Clipboard>
            </div>
            <Players id={id}/>
        </>
    )
}

const Copied = () =>{
    return <p className="copied">Copied!!</p>
}