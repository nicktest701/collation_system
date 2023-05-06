import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React from 'react';
import Add from '@mui/icons-material/Add';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const EmptyDataContainer = ({
  onClick,
  buttonText,
  img,
  message,
  showAddButton,
}) => {
  return (
    <Container sx={{ backgroundColor: '#fff' }}>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}
        paddingY={4}
      >
        <img
          loading="lazy"
          src={img}
          alt="empty_image"
          style={{
            width: 300,
            height: 300,
            objectFit: 'contain',
          }}
        />
        <Typography variant="body2" textAlign="center">
          {message}
        </Typography>
        {showAddButton && (
          <Button
            variant="contained"
            startIcon={<LibraryAddIcon />}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default EmptyDataContainer;
