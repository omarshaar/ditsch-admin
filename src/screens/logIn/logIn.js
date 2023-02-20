import React from "react";
import "./logIn.css";
import Logo from '../../assets/icons/logo.svg';
// MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
// Components
import Button from '../../components/global/button/Button';


const handleRememberMeCheckBox = () => {
    
}


export const LogIn = (props) => {
    return (
        <div className="LogInScreen d-flex justify-content-center align-items-center">
            <div className="LogFormContainer d-flex justify-content-center align-items-center flex-column">

                <div className="LoginTitle d-flex justify-content-center align-items-center"> 
                    <img src={Logo} className="LoginLogo" />
                    <p className="p6 titleP700">LOGIN</p> 
                </div>

                <div className="LogInputsContainer">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField id="EmailLoginInput" label="Email" variant="outlined" style={{ marginBottom: '20px' }} />
                        <TextField id="PasswordLoginInput" label="Password" variant="outlined" type={"password"}/>
                    </Box>
                </div>

                <div className="LogActionsContainer d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <div style={{marginLeft: '-9px'}}>
                            <Checkbox id="RememberCheckbox" sx={{ color: "#000" , '&.Mui-checked': { color: "#000" } }}  onChange={ ()=>{ handleRememberMeCheckBox()} } />
                        </div>
                        <p className="p1" style={{fontWeight: 400}} > Remember me </p>
                    </div>
                    <p className="p1" style={{color: "var(--primary)" , cursor: "pointer"}}>Forgot?</p>
                </div>
                    
                <div id="loginButton" onClick={ ()=> props.logIn()}>
                <Button style={{width: '100%' , height: '56px' , fontSize: '16px' , marginTop: '15px'}}>
                        Login
                </Button>
                </div>



                    

            </div>
        </div>
    );
}