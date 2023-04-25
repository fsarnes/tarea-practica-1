import React, { useState } from 'react';
import { Card, CardMedia, CardContent, IconButton, Tooltip, Divider, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const CardItem = (dog) => {
  const [visibleDescription, setVisibleDescription] = useState(false);

  return (
    <Card
      className='container__card'
      sx={{ border: 12, borderColor: 'white' }}
    >
      <CardMedia
        component='img'
        sx={{ aspectRatio: '1', borderRadius: '.25rem' }}
        title={`${dog.name}, ${dog.age} ${dog.age > 1 ? 'años' : 'año'}`}
        image={dog.url}
      />
      <CardContent className='card__content'>
        <div className='dog-header'>
          <span>{dog.name}</span>
          <span>, {dog.age} {dog.age > 1 ? 'años' : 'año'}</span>
          <p className='dog-distance'><PlaceOutlinedIcon sx={{ fontSize: 16 }} /> A {dog.distance} km de distancia</p>
        </div>
        <div style={visibleDescription || dog.accepted === null ? { display: 'block' } : { display: 'none' }}>
          <Divider />
          <p>{dog.description}</p>
        </div>
        {
          dog.accepted == null ?
          <Stack direction='row' spacing={2} justifyContent='center'>
            <Tooltip title='Aceptar' placement='bottom'>
              <IconButton id={`btn1${dog.id}`}
                onClick={() => dog.add(true)}
                size='large'
                color='success'
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Rechazar' placement='bottom'>
              <IconButton id={`btn2${dog.id}`}
                onClick={() => dog.add(false)}
                size='large'
                color='error'
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          :
          <>
            <Tooltip title={ dog.accepted ? 'Rechazar' : 'Aceptar' } placement='bottom'>
              <IconButton id={`btn3${dog.id}`}
                onClick={() => dog.changeStatus(dog)}
                size='large'
                color='primary'
              >
                <SwapHorizIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={ visibleDescription ? 'Ocultar descripción' : 'Ver descripción' } placement='bottom'>
              <IconButton id={`btn4${dog.id}`}
                sx={{ position: 'absolute', right: "1rem" }}
                onClick={() => setVisibleDescription(!visibleDescription)}
                size='large'
                color='primary'
              >
                {visibleDescription ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </Tooltip>
          </>
        }
      </CardContent>
    </Card>
  );
};

export default CardItem;