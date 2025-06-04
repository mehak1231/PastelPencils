import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import ItemDisplay from '../../components/ItemDisplay/ItemDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import Chatbot from '../../components/Chatbot/Chatbot'

const Home = () => {
    const [category, setCategory] = useState("All");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <ItemDisplay category={category}/> 
      <AppDownload/> 
      <Chatbot />
    </div>
  )
}

export default Home
