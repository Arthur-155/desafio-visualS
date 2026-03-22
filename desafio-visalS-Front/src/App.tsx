import './App.css'
import UserTable from './components/table/userTableInfo/UserTable'
import RegisterUserInfo from './components/registerUserInfo/RegisterUserInfo'
import EditUserInfo from './components/EditUserInfo/EditUserInfo'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<UserTable />}></Route>
        <Route path="/Register" element = {<RegisterUserInfo />}></Route>
        <Route path="/Edit" element = {<EditUserInfo />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
