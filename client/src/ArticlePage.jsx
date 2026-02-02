import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function ArticlePage(){
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch(`http://localhost:8000/api/articles/${id}/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => { if (mounted) setArticle(data) })
      .catch(err => { if (mounted) setError(err.message) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [id])

  if (loading) return <div style={{padding:20}}>Loading article...</div>
  if (error) return <div style={{padding:20,color:'red'}}>Error: {error}</div>
  if (!article) return <div style={{padding:20}}>Article not found.</div>

  return (
    <div style={{padding:20}}>
      <h1>{article.title}</h1>
      <p style={{color:'#666'}}>
        {article.author ? article.author.username : 'Unknown author'}
        {article.published_at ? ` — ${new Date(article.published_at).toLocaleString()}` : ''}
      </p>
      <div style={{whiteSpace:'pre-wrap', marginTop:20}}>
        {article.content}
      </div>

      <p style={{marginTop:30}}>
        <Link to="/">← Back to Home</Link>
      </p>
    </div>
  )
}
