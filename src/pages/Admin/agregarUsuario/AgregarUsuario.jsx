import {Container, Stack} from '@mui/material';

import UsuariosForm from '@/components/Forms/AdminForm/AdminForm';

const AgregarUsuario = () => {

  return (
    <Stack>
      <Container>
          <UsuariosForm></UsuariosForm>
      </Container>
    </Stack>
  );
};

export default AgregarUsuario;
