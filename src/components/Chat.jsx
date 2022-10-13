import Cam from '../assets/img/cam.png'
import Add from '../assets/img/add.png'
import More from '../assets/img/more.png'
import { Messages, Input } from './'
import { useChatContext } from '../context/ChatContext'

const Chat = () => {
  const { data } = useChatContext()

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.displayName}</span>
        <div className='chatIcons'>
          <img src={Cam} alt='camera icon' />
          <img src={Add} alt='add to contact icon' />
          <img src={More} alt='more options icon' />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
