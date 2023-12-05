import React from 'react'
import { Container, Stack, Grid} from '@mui/material'
import SimpleMenu from '@/components/Menu/Menu'
const Dashboard = () => {
  return (
    <Container fixed
      sx={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection: "column"
      }}
    >
      <Container
        sx={{
            p: 2,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'grey.50',
            margin:"10px",
            }}
      >
        <SimpleMenu></SimpleMenu>
      </Container>

      <Container
      sx={{
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'grey.50',
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection: "column",
      }}>
        <Stack 
          sx={{
              p: 2,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: 'grey.100',
              color: "white",
            }}>
            Hola
        </Stack>
        <Stack 
          sx={{
              p: 2,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: 'grey.100',
              color: "white",
            }}
        >
          Hola
        </Stack>
      </Container>
        
    </Container>
  )
}

export default Dashboard