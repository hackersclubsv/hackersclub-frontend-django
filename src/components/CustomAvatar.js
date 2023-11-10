import { Avatar } from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name, size) {
  // if (!name) return;
  const fontSize = `${size / 2}px`;
  const splitName = name.split(" ");

  let initials;
  if (splitName.length > 1) {
    // If there are two or more words, use the first letter of the first and second word
    initials = `${splitName[0][0]}${splitName[1][0]}`;
  } else {
    // If there is only one word, use the first letter of that word
    initials = `${splitName[0][0]}`;
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: fontSize,
    },
    children: initials,
  };
}

export default function CustomAvatar({ user, sx={} }) {
  const size = sx.width || sx.height || 40;
  if (user.avatar) {
    return <Avatar alt={user.username} src={user.avatar} sx={sx} />;
  } else {
    return (
      <Avatar
        {...stringAvatar(user.username)}
        sx={{ ...stringAvatar(user.username, size).sx, ...sx }}
      />
    );
  }
}
