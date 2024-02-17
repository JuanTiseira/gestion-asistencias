// import React from 'react';
// import { Typography, Box, Grid, Card, CardContent, Stack } from '@mui/material';
// import SchoolIcon from '@mui/icons-material/School';
// import GroupsIcon from '@mui/icons-material/Groups';
// import AlumnosPorDiaChart from '@/components/Charts/Dashboard/HomeChart';
// import AlumnosCircularChart from '@/components/Charts/Dashboard/Alumnos';

// function Home() {
//   return (
//     <Box sx={{ backgroundColor: 'grey.100', minHeight: '100vh', p: 2 }}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6} lg={6}>
//           <Grid container spacing={2}>
//             <Grid item xs={6} sm={6} md={6} lg={6}>
//               <Card className='gradient'>
//                 <CardContent>
//                   <div className='iconstyle'>
//                     <GroupsIcon />
//                   </div>
//                   <Typography variant="h1" >
//                     300
//                   </Typography>
//                   <Typography variant="body2" >
//                     Total de asistencias hoy
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={6} sm={6} md={6} lg={6}>
//               <Card className='gradientlight'>
//                 <CardContent>
//                   <div className='iconstyle'>
//                     <GroupsIcon />
//                   </div>
//                   <Typography variant="h1" >
//                     3000
//                   </Typography>
//                   <Typography variant="body2" >
//                     Total de asistencias anuales
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} md={6} lg={6}>
//           <Grid container spacing={2}>
//           <Grid item xs={6} sm={6} md={6} lg={6}>
//               <Card className='gradient'>
//                 <CardContent>
//                   <div className='iconstyle'>
//                     <GroupsIcon />
//                   </div>
//                   <Typography variant="h1" >
//                     100
//                   </Typography>
//                   <Typography variant="body2" >
//                     Preceptores
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={6} sm={6} md={6} lg={6}>
//               <Card className='gradient'>
//                 <CardContent>
//                   <div className='iconstyle'>
//                     <GroupsIcon />
//                   </div>
//                   <Typography variant="h1" >
//                     200
//                   </Typography>
//                   <Typography variant="body2" >
//                     Alumnos
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} md={8} lg={8}>
//           <Card sx={{ height: '100%' }}>
//             <CardContent>
//               <AlumnosPorDiaChart />
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4} lg={4}>
//           <Card sx={{ height: '100%' }}>
//             <CardContent>
//               <AlumnosCircularChart />
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import AlumnosPorDiaChart from '@/components/Charts/Dashboard/HomeChart';
import AlumnosCircularChart from '@/components/Charts/Dashboard/Alumnos';
import { useTheme } from '@emotion/react';
function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', p: 2 }}>
      <Typography variant="h1" align="center" sx={{ mt: 2, mb: 4, color: theme.palette.text.primary }}>
        ¡Bienvenido!
      </Typography>
      <Typography variant="h2" align="center" sx={{ mb: 2, color: theme.palette.text.secondary }}>
        {`Fecha y hora actual: ${currentTime.toLocaleString()}`}
      </Typography>
      <Box sx={{ borderBottom: `2px solid ${theme.palette.divider}`, mb: 4 }}></Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Card sx={{ backgroundColor: '#ff7854', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                  <div className='iconstyle'>
                    <GroupsIcon />
                  </div>
                  <Typography variant="h3" sx={{ color: '#ffffff' }}>
                    300
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Total de asistencias hoy
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Card sx={{ backgroundColor: '#ffae42', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                  <div className='iconstyle'>
                    <GroupsIcon />
                  </div>
                  <Typography variant="h3" sx={{ color: '#ffffff' }}>
                    3000
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Total de asistencias anuales
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Card sx={{ backgroundColor: '#4fc3f7', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                  <div className='iconstyle'>
                    <SchoolIcon />
                  </div>
                  <Typography variant="h3" sx={{ color: '#ffffff' }}>
                    100
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Preceptores
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Card sx={{ backgroundColor: '#81c784', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                  <div className='iconstyle'>
                    <SchoolIcon />
                  </div>
                  <Typography variant="h3" sx={{ color: '#ffffff' }}>
                    200
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Alumnos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}></Box>
      <Box sx={{ borderBottom: '2px solid #ccc', mb: 4 }}></Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          <Card sx={{ height: '100%', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <AlumnosPorDiaChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card sx={{ height: '100%', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <AlumnosCircularChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
