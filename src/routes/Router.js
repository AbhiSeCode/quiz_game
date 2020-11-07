import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Home} from '../Components/Home'
import {Quiz} from '../Components/Quiz'
import {Result} from '../Components/Result'
import {Dashboard} from '../Components/Dashboard'
import {PlayQuiz} from '../Components/PlayQuiz'


export const ReactRouter= ()=>{
    return(
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route path="/quiz">
                    <Quiz/>
                </Route>
                <Route path="/result/:id">
                    <Result/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route path="/playquiz/:id">
                    <PlayQuiz/>
                </Route>
            </Switch>
        </Router>
    )
}