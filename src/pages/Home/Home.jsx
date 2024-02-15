import React from 'react';
import { Typography, Box, Grid, Card, Stack } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import "../../../src/Dash.css";
import SchoolIcon from '@mui/icons-material/School';
import { useTheme } from '@emotion/react';
import GroupsIcon from '@mui/icons-material/Groups';
import AlumnosPorDiaChart from '@/components/Charts/Dashboard/HomeChart';
import AlumnosCircularChart from '@/components/Charts/Dashboard/Alumnos';

function Home() {
  const theme =useTheme();
  return (
    <>
    <Stack sx={{backgroundColor: 'grey.100', minHeight: '100vh'}}>
    <Box height={70}>
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
            <Stack spacing={2} direction="row">
            <Card sx={{ minWidth: 49 + "%", height: 160 }} className='gradient'>
              <CardContent>
                <div className='iconstyle'>
                  <GroupsIcon/>
                </div>
                <Typography gutterBottom variant="h1" component="div" sx={{color:'#ffffff'}}>
                  300
                </Typography>
                <Typography 
                  gutterBottom 
                  variant="body2" 
                  component="div" 
                  sx={{color:'#ccd1d1'}}>
                  Total de asistencias hoy
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 49 + "%", height: 160 }} className='gradientlight'>
              <CardContent>
                <div className='iconstyle'>
                  <GroupsIcon/>
                </div>
                <Typography gutterBottom variant="h1" component="div" sx={{color:'#ffffff'}}>
                  3000
                </Typography>
                <Typography 
                  gutterBottom 
                  variant="body2" 
                  component="div" 
                  sx={{color:'#ccd1d1'}}>
                  Total de asistencias En el año
                </Typography>
              </CardContent>
            </Card>
            </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={2} sx={{marginBlockEnd: '16px'}} >
                <Card className='gradientlight'>
                  <Stack  direction="row">
                    <div className='iconstyle'>
                      <SchoolIcon/>
                    </div>
                    <div className='paddingall'>  
                    
                      <span className='studentTitle'>200</span>
                      <br></br>
                      <span className='studentSubTitle'>Alumnos</span>
                    </div>
                  </Stack>
                </Card>
                <Card>
                  <Stack  direction="row">
                    <div className='iconstyleblack'>
                      <SchoolIcon/>
                    </div>
                    <div className='paddingall'>  
                      <span className='studentTitle'>200</span>
                      <br></br>
                      <span className='studentSubTitle'>Preceptores</span>
                    </div>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <Box height={20}> 
          {/* sx={{marginTop: "5px"}} */}
          <Grid container spacing={2} sx={{
                    display: 'flex',}}>
            <Grid item xs={8}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                  {/* <AlumnosPorDiaChart></AlumnosPorDiaChart> */}
                  <AlumnosCircularChart></AlumnosCircularChart>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
    </Stack>
    </>
  );
}

export default Home;
