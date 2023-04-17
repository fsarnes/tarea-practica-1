import React, { useState, useEffect, useRef } from 'react'
import { Card, CardMedia, CardContent, IconButton, Tooltip, Divider, Stack, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

const CardItem = (dog) => {
  const [imgHeight, setImgHeight] = useState(0);
  const [icon, setIcon] = useState(null)
  const ref = useRef(null);

  useEffect(() => {
    setImgHeight(ref.current.clientHeight);
    if (dog.accepted != null)
      dog.accepted ? setIcon(<CheckIcon style={{ color: '#FFF' }} />) : setIcon(<ClearIcon style={{ color: '#FFF' }} />);
    else
    document.getElementById(`btn${dog.id}`).style.display = 'none';
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setImgHeight(ref.current.clientHeight)
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const changeIcon = (mouse) => {
    if (mouse === 'over') {
      dog.accepted ? setIcon(<ClearIcon style={{ color: '#FFF' }} />) : setIcon(<CheckIcon style={{ color: '#FFF' }} />);
      document.getElementById(`btn${dog.id}`).style.background = dog.accepted ? '#ED2939' : '#17B169';
    }
    if (mouse === 'leave') {
      dog.accepted ? setIcon(<CheckIcon style={{ color: '#FFF' }} />) : setIcon(<ClearIcon style={{ color: '#FFF' }} />);
      document.getElementById(`btn${dog.id}`).style.background = dog.accepted ? '#17B169' : '#ED2939';
    }
  };

  return (
    <Card
      className='container__card'
      sx={{ boxShadow: 3, border: 12, borderColor: 'white' }}
    >
      <Tooltip title={dog.accepted ? 'Rechazar' : 'Aceptar'} placement='right'>
        <IconButton id={`btn${dog.id}`}
          style={{ position: 'absolute', top: imgHeight - 24, right: '1rem', background: dog.accepted ? '#17B169' : '#ED2939', transition: 'background .2s linear' }}
          onClick={() => dog.changeStatus(dog)}
          onMouseOver={() => changeIcon('over')}
          onMouseLeave={() => changeIcon('leave')}
          size='large'
          sx={{ boxShadow: 2 }}
        >
          {icon}
        </IconButton>
      </Tooltip>
      <CardMedia
        ref={ref}
        component='img'
        style={{ aspectRatio: '1', borderRadius: '.25rem' }}
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
          dog.accepted == null ?
          <Stack direction='row' spacing={1}>
            <Button onClick={() => dog.add(false)} fullWidth={true} color='error' variant='contained' startIcon={<ClearIcon />}>
              Rechazar
            </Button>
            <Button onClick={() => dog.add(true)} fullWidth={true} color='success' variant='contained' startIcon={<CheckIcon />}>
              Aceptar
            </Button>
          </Stack>
          :
          ''
        }
      </CardContent>
    </Card>
  );
};

export default CardItem;