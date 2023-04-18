import React, { useState, useEffect, useRef } from 'react';
import { Card, CardMedia, CardContent, IconButton, Tooltip, Divider, Stack, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

const CardItem = (dog) => {
  const [imgHeight, setImgHeight] = useState(0);
  const [icon, setIcon] = useState(null);
  const ref = useRef(null);
  const states =
  {
    'accepted': {
      'icon': <CheckIcon sx={{ color: '#FFF' }} />,
      'color': '#17B169'
    },
    'rejected': {
      'icon': <ClearIcon sx={{ color: '#FFF' }} />,
      'color': '#ED2939'
    }
  };

  useEffect(() => {
    setImgHeight(ref.current.clientHeight);
    if (dog.accepted != null)
      setIcon(dog.accepted ? states.accepted.icon : states.rejected.icon);
    else
      document.getElementById(`btn${dog.id}`).style.display = 'none';
  }, []);

  useEffect(() => {
    const handleWindowResize = () => setImgHeight(ref.current.clientHeight);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  });

  const changeIcon = (mouse) => {
    if (mouse === 'over') {
      setIcon(dog.accepted ? states.rejected.icon : states.accepted.icon);
      document.getElementById(`btn${dog.id}`).style.background = dog.accepted ? states.rejected.color : states.accepted.color;
    }
    if (mouse === 'leave') {
      setIcon(dog.accepted ? states.accepted.icon : states.rejected.icon);
      document.getElementById(`btn${dog.id}`).style.background = dog.accepted ? states.accepted.color : states.rejected.color;
    }
  };

  return (
    <Card
      className='container__card'
      sx={{ boxShadow: 3, border: 12, borderColor: 'white' }}
    >
      <Tooltip title={dog.accepted ? 'Rechazar' : 'Aceptar'} placement='right'>
        <IconButton id={`btn${dog.id}`}
          sx={{ position: 'absolute', top: imgHeight - 24, right: '1rem', background: dog.accepted ? states.accepted.color : states.rejected.color, transition: 'background .2s linear' }}
          onClick={() => dog.changeStatus(dog)}
          onMouseOver={() => changeIcon('over')}
          onMouseLeave={() => changeIcon('leave')}
          size='large'
          style={{ boxShadow: 2 }}
        >
          {icon}
        </IconButton>
      </Tooltip>
      <CardMedia
        ref={ref}
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
        <Divider />
        <p>{dog.description}</p>
        {
          dog.accepted == null &&
          <Stack direction='row' spacing={1}>
            <Button onClick={() => dog.add(false)} fullWidth={true} color='error' variant='contained' startIcon={<ClearIcon />}>
              Rechazar
            </Button>
            <Button onClick={() => dog.add(true)} fullWidth={true} color='success' variant='contained' startIcon={<CheckIcon />}>
              Aceptar
            </Button>
          </Stack>
        }
      </CardContent>
    </Card>
  );
};

export default CardItem;