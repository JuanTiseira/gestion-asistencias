import React from 'react'
import { Container, Stack} from '@mui/material'
import SimpleMenu from '@/components/Menu/Menu'
const Dashboard = () => {
  return (
    <Container>
        <Stack
        sx={{
            p: 2,
            boxShadow: 3,
            borderRadius: 5,
            position: 'relative',
            backgroundColor: 'grey.100',
          }}
          gap={1}>
            <SimpleMenu></SimpleMenu>
        </Stack>
        <Container 
        sx={{
            p: 2,
            boxShadow: 3,
            borderRadius: 5,
            position: 'relative',
            backgroundColor: 'grey.100',
          }}>
            
        </Container>
    </Container>
  )
}

export default Dashboard