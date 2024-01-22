import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Link,
  IconButton,
  Alert,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import AuthOutlet from './AuthOutlet';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, errorUser, loadingUser } from '@/features/user/userSlice';

function Login() {
  const error = useSelector(errorUser);
  const loading = useSelector(loadingUser);
  const user = useRef(null);
  const pass = useRef(null);
  const [username, setEmail] = useState('');
  const [password, setPass] = useState('');

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(username, password)
    if (username === '') {
      // Please enter your email.
      user.current.focus();
    } else if (password === '') {
      // 'Please enter your password.'
      pass.current.focus();
    } else {

      let userCredential={
        username, password
      }
      dispatch(loginUser(userCredential)).then((result)=>{
        if(result.payload){
          setEmail('');
          setPass('');
          navigate('/home');
        }
      })
    }
  };

  useEffect(() => {
    user.current.focus();
  }, []);

  return (
    <AuthOutlet header={"Bienvenido de nuevo!"}>
      <TextField
        inputRef={user}
        type="text"
        label="Usuario"
        variant="outlined"
        autoComplete="off"
        onChange={(e)=>setEmail(e.target.value)}
      />
      <Stack gap={1}>
        <TextField
          inputRef={pass}
          type={showPassword ? 'text' : 'password'}
          label="Constraseña"
          variant="outlined"
          onChange={(e)=>setPass(e.target.value)}
          sx={{ '& .MuiInputBase-root ': { pr: '4px' } }}
          autoComplete="new-password"
          InputProps={{
            // <-- This is where the toggle button sis added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={loginHandler}>
          {loading?"Iniciando sesion...":"Iniciar sesion"}
        </Button>
      {error&&(<Alert severity="error">{error}</Alert>)}
      </Stack>
    </AuthOutlet>
  );
}

export default Login;
