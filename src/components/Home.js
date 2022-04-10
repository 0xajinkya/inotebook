import React, {useContext} from 'react'
// eslint-disable-next-line 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Notes from './Notes';

const Home = (props) => {
  const showAlert = props.showAlert; 
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>

  )
}

export default Home