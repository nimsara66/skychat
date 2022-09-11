import Cam from '../assets/img/cam.png'
import Add from '../assets/img/add.png'
import More from '../assets/img/more.png'
import { Messages, Input } from './'

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>Moreno</span>
        <div className='chatIcons'>
          <img src={Cam} alt='camera icon'/>
          <img src={Add} alt='add contact icon'/>
          <img src={More} alt='more options icon' />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat