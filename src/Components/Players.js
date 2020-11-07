import React, {useState, useEffect} from 'react'
import {Loading} from './Loading'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
export const Players = ({id}) => {

   
    const [players, setPlayers] = useState()
    const url =  window.location.origin   //'http://192.168.0.102:8080'
    const history = useHistory()
    const getPlayers= () =>{
        fetch(`${url}/user/getscores?user=${id}`)
        .then(response=>{
            if(response.status !== 200){
                throw new Error('User Not Found')
            }
            return response.json()
        })
        .then(players=>setPlayers(players))
        .catch(error=>{
            alert(error)
            Cookies.remove('id')
            history.push('/')
        })
    }
    useEffect(()=>{
        getPlayers()
    },[])
    
    if(!players){
        return <Loading/>
    }
    if(players.length === 0){
        return <></>
    }else{
        return (
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index)=>{
                            return (
                                <tr key={index}>
                                        <td>{player.name}</td>
                                        <td>{player.score}</td>
                                    </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        )
    }
}
