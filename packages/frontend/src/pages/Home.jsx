import { Link } from 'react-router'

function Home() {
  return (
    <div>
      <h1>I am the home page</h1>
      <Link to="/game">Go to game</Link>
    </div>
  )
}

export default Home
