const Search = () => {
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type='text' placeholder='Find a user'/>
      </div>

      <div className='userChat'>
        <img src='https://images.unsplash.com/photo-1662659511992-b84858a3e1d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80' alt=''/>
        <div className='userChatInfo'>
          <span>Moreno</span>
        </div>
      </div>
    </div>
  )
}

export default Search