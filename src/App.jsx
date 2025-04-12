import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './index.css'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/add-blog">Add Blog</Link>
    </nav>
  )
}

function Home() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setBlogs(data.slice(0, 20)))
  }, [])

  return (
    <div>
      <h2>Blog Dashboard</h2>
      <ul className="blog-list">
        {blogs.map(blog => (
          <li key={blog.id} className="blog-card">
            <strong>ID:</strong> {blog.id}<br />
            <strong>Title:</strong> {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

function AddBlog() {
  const [blogName, setBlogName] = useState('')
  const [description, setDescription] = useState('')
  const [authorName, setAuthorName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBlog = { blogName, description, authorName }
    console.log('New Blog Submitted:', newBlog)
    setBlogName('')
    setDescription('')
    setAuthorName('')
  }

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type="text"
          placeholder="Blog Name"
          value={blogName}
          onChange={(e) => setBlogName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-blog" element={<AddBlog />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


