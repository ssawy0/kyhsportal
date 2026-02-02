import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ArticlePage from './ArticlePage'
import ArticleList from './ArticleList'

function Home(){
  return (
    <div style={{padding:20}}>
      <h1>Nonprofit Portal (Client)</h1>
      <p>Frontend skeleton. Connect to the Django API at <code>http://localhost:8000/api/</code></p>
      <p>To view an article, navigate to <code>/articles/&lt;id&gt;</code>. Example: <Link to="/articles/1">/articles/1</Link></p>
    </div>
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/articles" element={<ArticleList/>} />
        <Route path="/articles/:id" element={<ArticlePage/>} />
      </Routes>
    </BrowserRouter>
  )
}
