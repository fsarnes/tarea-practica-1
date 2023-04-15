import React, { useState, useEffect, useRef } from 'react'
import { Card, CardMedia, CardContent, IconButton, Tooltip, Divider, Stack, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

const CardItem = (props) => {
  const [imgHeight, setImgHeight] = useState(0);
  const [icon, setIcon] = useState(null)
  const ref = useRef(null);

  useEffect(() => {
    setImgHeight(ref.current.clientHeight);
    if (props.accepted != null)
      props.accepted ? setIcon(<CheckIcon style={{ color: '#FFF' }} />) : setIcon(<ClearIcon style={{ color: '#FFF' }} />);
    else
    document.getElementById(`btn${props.id}`).style.display = 'none';
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
      props.accepted ? setIcon(<ClearIcon style={{ color: '#FFF' }} />) : setIcon(<CheckIcon style={{ color: '#FFF' }} />);
      document.getElementById(`btn${props.id}`).style.background = props.accepted ? '#ED2939' : '#17B169';
    }
    if (mouse === 'leave') {
      props.accepted ? setIcon(<CheckIcon style={{ color: '#FFF' }} />) : setIcon(<ClearIcon style={{ color: '#FFF' }} />);
      document.getElementById(`btn${props.id}`).style.background = props.accepted ? '#17B169' : '#ED2939';
    }
  };

  return (
    <Card
      className='container__card'
      sx={{ boxShadow: 3, border: 12, borderColor: "white" }}
    >
      <Tooltip title={props.accepted ? 'Rechazar' : 'Aceptar'} placement='right'>
        <IconButton id={`btn${props.id}`}
          style={{ position: 'absolute', top: imgHeight - 24, right: '1rem', background: props.accepted ? '#17B169' : '#ED2939', transition: 'background .2s linear' }}
          onClick={() => props.changeStatus(props)}
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
        title={`${props.name}, ${props.old} ${props.old > 1 ? 'años' : 'año'}`}
        image={props.url}
      />
      <CardContent className='card__content'>
        <div className='dog-header'>
          <span>{props.name}</span>
          <span>, {props.old} {props.old > 1 ? 'años' : 'año'}</span>
          <p className='dog-distance'><PlaceOutlinedIcon sx={{ fontSize: 16 }} /> A {props.distance} km de distancia</p>
        </div>
        <Divider />
        <p>{props.description}</p>
        {
          props.accepted == null ?
          <Stack direction="row" spacing={1}>
            <Button onClick={() => props.add(false)} fullWidth={true} color='error' variant="contained" startIcon={<ClearIcon />}>
              Rechazar
            </Button>
            <Button onClick={() => props.add(true)} fullWidth={true} color='success' variant="contained" startIcon={<CheckIcon />}>
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