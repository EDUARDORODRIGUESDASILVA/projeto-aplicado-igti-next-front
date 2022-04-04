import { Avatar, Box, Button, Card, CardHeader, IconButton } from "@mui/material";
import { red } from '@mui/material/colors';
import Title from '../dashboard/Title';


export default function TemplateHeader() {
  const handleAvatarClick = () => {
  }
  return (
    <Card sx={{ px: '2px' }}>
      <CardHeader
        avatar={
          <IconButton
            onClick={handleAvatarClick}
          >
            <Avatar sx={{ bgcolor: red[500] }}

              aria-label="recipe">
              <small>2625</small>
            </Avatar>
          </IconButton>
        }

        action={<Box sx={{ mt: '13px' }}>


          <Button variant="text"

          >
            Ação 1
          </Button>
        </Box>}

        title={<Title>Titulo da página</Title>}
        subheader={'Nome do agregador aqui'}
      />
    </Card>
  )
}
