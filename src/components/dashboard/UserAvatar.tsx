import { IconButton, Popover, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/userSlice';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  if (typeof name == "undefined" || name == '' || name.split(' ').length < 2) {
    return {}
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function UserAvatar() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const user = useAppSelector(selectUser);

  return (
    <>
      {user ? (
        <>
          <IconButton onClick={handleClick}>
            <Avatar {...stringAvatar(user.nome)} sx={{ bgcolor: deepOrange[500] }}></Avatar>
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }} align="center">
              <b>{user.nome}</b><br/>
              {user.funcao}<br />
              {user.matricula} - {user.unidadeId}<br />

            </Typography>
          </Popover>

        </>
      ) : (<></>)
      }
    </>
  )
}


