import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useReducer, useContext } from 'react'
import { auth } from '../firebase'
import { useAuthContext } from './AuthContext'

const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useAuthContext()

  const initialState = {
    chatId: 'null',
    user: {},
  }

  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        }
    }
  }

  const [state, dispatch] = useReducer(chatReducer, initialState)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => {
  return useContext(ChatContext)
}
