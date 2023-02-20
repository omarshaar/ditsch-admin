import './App.css';
import './style/Normalize/Normalize.css';
import './style/global/main.css';
import './style/global/colors.css';
import './style/global/odeTable.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
// Screens
import { Home } from './screens/Home/Home';
import { Analyse } from './screens/analyse/Analyse';
import { Tasks } from './screens/tasks/Tasks';
import { LogIn } from './screens/logIn/logIn';
import { Calender } from './screens/Calender/Calender';
import Page from './screens/page/Page';
import Employee from './screens/Employees/Employees';
import Statistics from './screens/Statistics/Statistics';
import Bruch from './screens/Bruch/Reinigung';
import Theke from './screens/Theke/Theke';
import OverTimes from './screens/OverTimes/OverTimes';
import Kaffe from './screens/Kaffe/Kaffe';
// Components
import { Aside } from './components/global/aside/Aside';
import { MainHeader } from './components/global/header/Header';
import React , { useState , useEffect} from 'react';
import { Drawer } from './components/global/Drawer/Drawer'
// Context
import { MainProvider } from './context/main';
import { handleAdminLogIn } from './service/main';


function App() {
  const [ loggedIn , setlLoggedIn ] = useState(false);


  useEffect(()=>{
    localStorage.getItem("lg") == "tr" ? setlLoggedIn(true) : setlLoggedIn(false);
    getDarkMod();
  },[]);

  const lLoggedIn = function(){
    const EmailLoginInput = document.getElementById("EmailLoginInput");
    const PasswordLoginInput = document.getElementById("PasswordLoginInput");
    const RememberCheckbox = document.getElementById("RememberCheckbox");

    let obj = {
      req: "handleAdminLogIn",
      userName: EmailLoginInput.value,
      pass: PasswordLoginInput.value
    }

    handleAdminLogIn(obj).then(data => {
      data.admin == "true" && setlLoggedIn(true);
      data.admin == "true" && RememberCheckbox.checked && localStorage.setItem("lg", "tr");
    });


    //
  }
  if (!loggedIn) { return(<LogIn logIn={()=>lLoggedIn()} />)}

  function getDarkMod() {
    let storage;
    try{ storage = JSON.parse(localStorage.getItem("dark")) }
    finally{ storage ? document.documentElement.classList.add("darkMood") : document.documentElement.classList.remove("darkMood");  }
  }

  return (
    <MainProvider >
      <Router>
          <div className="App d-flex justify-content-between" >
            <Aside />
            <div className="mainContainer" id='mainContainer'>
              <MainHeader /> <Drawer />
              <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/page" element={<Page />} />
                <Route path="/Calender" element={<Calender />} /> 
                <Route path="/Analyse" element={<Analyse />} />
                <Route path="/Tasks" element={<Tasks />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/transaktion" element={<Statistics />} />
                <Route path="/reinigung" element={<Bruch />} />
                <Route path="/theke" element={<Theke />} />
                <Route path="/overtimes" element={<OverTimes />} />
                <Route path="/kaffe" element={<Kaffe />} />
              </Routes>
            </div>
          </div>
      </Router>
    </MainProvider>
  );
}
export default App;
