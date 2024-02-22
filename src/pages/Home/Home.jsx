import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import { useTheme } from '@emotion/react';
import AlumnosPorDiaChart from '@/components/Charts/Dashboard/HomeChart';
import AlumnosCircularChart from '@/components/Charts/Dashboard/Alumnos';

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
    <Box
      height="100vh"
      sx={{
        display: 'column',
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 2, color: theme.palette.text.primary }}
        >
          Hola, Bienvenido de nuevo
        </Typography>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 2, color: theme.palette.text.secondary }}
        >
          {`${currentTime.toLocaleString()}`}
        </Typography>
      </Box>

      <Box sx={{ mt: 2, flexGrow: 1, height: '20%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Card
                  sx={{
                    backgroundColor: theme.palette.Yellow.Lighter,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CardContent>
                    <div>
                      <GroupsIcon
                        sx={{ color: theme.palette.Yellow.Darkest }}
                      />
                    </div>
                    <Typography
                      variant="h3"
                      sx={{ color: theme.palette.Yellow.Darkest }}
                    >
                      3000
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.Yellow.Darkest }}
                    >
                      Total de asistencias anuales
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Card
                  sx={{
                    backgroundColor: theme.palette.Red.Lighter,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CardContent>
                    <div>
                      <GroupsIcon sx={{ color: theme.palette.Red.Darkest }} />
                    </div>
                    <Typography
                      variant="h3"
                      sx={{ color: theme.palette.Red.Darkest }}
                    >
                      3000
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.Red.Darkest }}
                    >
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
                <Card
                  sx={{
                    backgroundColor: theme.palette.Blue.Lighter,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CardContent>
                    <div>
                      <SchoolIcon sx={{ color: theme.palette.Blue.Darker }} />
                    </div>
                    <Typography
                      variant="h3"
                      sx={{ color: theme.palette.Blue.Darker }}
                    >
                      100
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.Blue.Darker }}
                    >
                      Preceptores
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Card
                  sx={{
                    backgroundColor: theme.palette.Green.Lightest,
                    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CardContent>
                    <div>
                      <SchoolIcon sx={{ color: theme.palette.Green.Darkest }} />
                    </div>
                    <Typography
                      variant="h3"
                      sx={{ color: theme.palette.Green.Darkest }}
                    >
                      200
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.Green.Darkest }}
                    >
                      Alumnos
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }} />
      <Box sx={{ mt: 4, flexGrow: 1, height: '90%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={8}>
            <Card
              sx={{
                height: '100%',
                boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardContent>
                <AlumnosPorDiaChart />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Card
              sx={{
                height: '100%',
                boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardContent>
                <AlumnosCircularChart />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
