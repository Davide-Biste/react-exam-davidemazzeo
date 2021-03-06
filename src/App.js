import logo from './logo.svg';
import {Button, CircularProgress} from "@mui/material";
import './App.css';
import {getOrders, getUsers} from "./api";
import {useState} from "react";
import List from "./Component/List";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';

function App() {

    const [waitData, setWaitData] = useState(null);
    const [usersToPass, setUsersToPass] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getListOfUsers = async () => {
        setIsLoading(true);
        const data = await getUsers();
        await setWaitData(data);
        console.log({data})

        await setUsersToPass(data);
        setIsLoading(false);
    }

    const getListOfOrders = async () => {
        setIsLoading(true);
        const data = await getOrders();
        await setWaitData(data);
        console.log({data})

        const users = await getUsers();
        await setUsersToPass(users);
        console.log({users})

        setIsLoading(false);
    }

  return (
    <div className="App">
        <div style={{display:"flex",flexDirection:"row"}}>
            <div className="Button-home">
                <Button style={{height:70, width:140}} startIcon={<PeopleAltIcon />} onClick={getListOfUsers} variant="contained">Utenti</Button>
            </div>
            <div className="Button-home">
                <Button style={{height:70, width:140}} startIcon={<WorkIcon />} onClick={getListOfOrders} variant="contained">Commesse</Button>
            </div>
        </div>
        {waitData && usersToPass ? waitData.map((data)=>{
            return <List data={data} usersToPass={usersToPass} key={data._id}/>
        }) : <div>
            {isLoading ? <CircularProgress/> : <text>Clicca un bottone per visualizzare i dati!</text>
            }
        </div>}
    </div>


  );
}

export default App;
