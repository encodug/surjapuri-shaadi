import { ChatConnectionProvider } from "./useChatConnection"


function Layout({children}) {
  return (
    <ChatConnectionProvider>
        {children}
    </ChatConnectionProvider>
  )
}

export default Layout
