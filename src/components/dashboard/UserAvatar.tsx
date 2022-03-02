import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/userSlice';
import AccountMenu from './AcountMenu';

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
  if (typeof name == "undefined") {
    name = ''
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function UserAvatar() {

  const user = useAppSelector(selectUser);

  return (
    <>
      {user ? (
        <>
      <AccountMenu></AccountMenu>
      <Avatar {...stringAvatar(user.nome)} sx={{ bgcolor: deepOrange[500] }}></Avatar>
      </>
      ) : (<></>)
      }
    </>
  )
}


