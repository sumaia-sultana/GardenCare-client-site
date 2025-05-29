 
import './App.css'
import MyTips from './Components/MyTips'
import ShareTips from './Components/ShareTips'
import AuthProvider from './Context/AuthProvider'

function App() {
   

  return (
   <AuthProvider>
     <Routes>
      <Route path="/mytips" Component={MyTips} />
      <Route path="/share-tips" Component={ShareTips  } />
       
    </Routes>
   </AuthProvider>
  )
}

export default App
