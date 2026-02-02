import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function clamp(n, min, max){
  return Math.max(min, Math.min(max, n))
}

export default function ArticleList(){
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState({ results: [], count: 0, next: null, previous: null })

  // Read page and page_size from URL query params, fallback to defaults
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSizeParam = parseInt(searchParams.get('page_size') || '10', 10)
  const pageSize = clamp(isNaN(pageSizeParam) ? 10 : pageSizeParam, 1, 100)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    fetch(`http://localhost:8000/api/articles/?page=${page}&page_size=${pageSize}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(json => { if (mounted) setData(json) })
      .catch(err => { if (mounted) setError(err.message) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [page, pageSize])

  function goToPage(p){
    setSearchParams(params => {
      params.set('page', String(p))
      params.set('page_size', String(pageSize))
      return params
    })
  }

  function setPageSize(e){
    const v = clamp(parseInt(e.target.value || '10', 10), 1, 100)
    setSearchParams(params => {
      params.set('page', '1')
      params.set('page_size', String(v))
      return params
    })
  }

  if (loading) return <div style={{padding:20}}>Loading articles...</div>
  if (error) return <div style={{padding:20,color:'red'}}>Error: {error}</div>

  const total = data.count || 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div style={{padding:20}}>
      <h1>Articles</h1>
      <div style={{marginBottom:10}}>
        <label>Page size: </label>
        <input type="number" min="1" max="100" value={pageSize} onChange={setPageSize} style={{width:80}} />
        <span style={{marginLeft:10}}>Total: {total}</span>
      </div>

      <ul>
        {data.results.map(a => (
          <li key={a.id} style={{marginBottom:12}}>
            <Link to={`/articles/${a.id}`}><strong>{a.title}</strong></Link>
            <div style={{color:'#666'}}>{a.author ? a.author.username : 'Unknown'} — {a.published_at ? new Date(a.published_at).toLocaleString() : ''}</div>
          </li>
        ))}
      </ul>

      <div style={{marginTop:20, display:'flex', alignItems:'center', gap:12}}>
        <button onClick={() => goToPage(1)} disabled={page <= 1}>First</button>
        <button onClick={() => goToPage(Math.max(1, page-1))} disabled={page <= 1}>Previous</button>
        <span style={{margin:'0 12px'}}>Page {page} of {totalPages}</span>
        <button onClick={() => goToPage(Math.min(totalPages, page+1))} disabled={page >= totalPages}>Next</button>
        <button onClick={() => goToPage(totalPages)} disabled={page >= totalPages}>Last</button>
      </div>
    </div>
  )
}
