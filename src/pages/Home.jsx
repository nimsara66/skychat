import { Sidebar, Chat } from "../components"

const Home = () => {
  return (
    <div className="home">
      <div className='container'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home