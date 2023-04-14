import { useEffect, useState } from 'react';
import './App.css';
import ImgRechazados from './assets/rechazados.svg';
import ImgAceptados from './assets/aceptados.svg';
import CardItem from './components/CardItem';
import GitHubIcon from '@mui/icons-material/GitHub';
import { List, ListItem, Box, Grid, Stack, Card, Button, Skeleton } from '@mui/material';
import axios from 'axios';
import dogNames from 'dog-names';

function App() {
  const [dogCount, setDogCount] = useState(0);
  const [dog, setDog] = useState({});
  const [dogOk, setDogOk] = useState(false);

  const descripciones = [
    'Soy un perro que siempre está emocionado por conocer a nuevas personas y le encanta jugar.',
    'Soy un can que se lleva bien con todos los que conoce, sin importar su edad o especie.',
    'Soy un perro amistoso que siempre quiere estar cerca de sus seres queridos y recibe con entusiasmo a cualquier visita.',
    'Canino que tiene un temperamento gentil y tranquilo, y nunca mostraría agresividad.',
    'Soy un perro leal y cariñoso que siempre está feliz de hacer nuevos amigos.',
    'Soy un can que se siente atraído por los extraños y hace todo lo posible para ganarse su afecto.',
    'Un perro amigable que siempre está dispuesto a compartir su espacio y juguetes con otros.',
    'Un perro al que le encanta dar abrazos y besos a todos los que conoce.',
    'Un canino que es muy sociable y disfruta pasar tiempo con otros perros en el parque.',
    'Soy un perro que siempre está emocionado de ver a su dueño, incluso si solo se han separado por unos minutos.',
    'Perro amistoso que tiene un gran corazón y siempre está dispuesto a hacer amigos.',
    'Soy un can que siempre está feliz de dar un paseo y conocer a nuevas personas.',
    'Soy un perro que nunca es agresivo y siempre es amable con las personas y otros animales.',
    'Perro amigable que siempre está dispuesto a prestar atención y escuchar lo que tienes que decir.',
    'Soy un canino que es un excelente compañero y siempre está dispuesto a pasar tiempo contigo.',
    'Soy un perro que es muy acogedor y siempre hace que los invitados se sientan como en casa.'
  ];

  const getRandomDescription = () => {
     return descripciones[Math.floor(Math.random() * descripciones.length)];
  };

  const getDog = () => {
    axios
      .get('https://dog.ceo/api/breeds/image/random')
      .then((response) => {
        let dogName = dogNames.allRandom();
        setDog({
          id: `${dogCount + 1}-${dogName}`,
          name: dogName,
          old: Math.floor(Math.random() * 17 + 1),
          distance: Math.floor(Math.random() * 30 + 1),
          description: getRandomDescription(),
          url: response.data.message
        });
      });
    setDogCount(dogCount + 1);
  };

  useEffect(() => {
    getDog();
  }, []);

  useEffect(() => {
    if (dog.url != undefined) setDogOk(true);
  }, [dog]);

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Box className='container' sx={{ boxShadow: 3 }}>
            <img src={ImgRechazados} width='75%' title='' alt='Rechazados' />

            <Stack
              direction='column-reverse'
              justifyContent='flex-end'
              alignItems='stretch'
              spacing={2}
            >
              <CardItem
                id='1-negrito'
                name='Negrito'
                old='2'
                distance='5'
                description='Soy un can que se lleva bien con todos los que conoce, sin importar su edad o especie.'
                aceptado={false}
                url='https://images.dog.ceo/breeds/schipperke/n02104365_8548.jpg'/>
              <CardItem
                id='2-shep'
                name='Shep'
                old='5'
                distance='27'
                description='Perro amistoso que tiene un gran corazón y siempre está dispuesto a hacer amigos.'
                aceptado={false}
                url='https://images.dog.ceo/breeds/australian-shepherd/leroy.jpg'/>
            </Stack>

          </Box>
        </Grid>
        <Grid item xs={4}>
          {
            dogOk ?
              <CardItem
              id={dog.id}
              name={dog.name}
              old={dog.old}
              distance={dog.distance}
              description={dog.description}
              aceptado={null}
              url={dog.url}/>
            :
            <Card className='container__card' sx={{ boxShadow: 3, border: 12, borderColor: "white" }}>
              <Stack spacing={3}>
                <Skeleton variant='rectangular' style={{ aspectRatio: '1', height: '100%' }} />
                <Stack spacing={1}>
                  <Skeleton variant='rectangular' width='40%' height='1.5rem'/>
                  <Skeleton variant='rectangular' width='60%' height='1rem'/>
                </Stack>
                <Stack spacing={1}>
                  <Skeleton variant='rectangular' width='90%' height='1rem'/>
                  <Skeleton variant='rectangular' width='90%' height='1rem'/>
                  <Skeleton variant='rectangular' width='30%' height='1rem'/>
                </Stack>
                <Stack direction='row' spacing={1}>
                  <Skeleton variant='rectangular' width='50%' height='2rem'/>
                  <Skeleton variant='rectangular' width='50%' height='2rem'/>
                </Stack>
              </Stack>
            </Card>
          }
        </Grid>
        <Grid item xs={4}>
          <Box className='container' sx={{ boxShadow: 3 }}>
            <img src={ImgAceptados} width='75%' title='' alt='Rechazados' />

            <Stack
              direction='column-reverse'
              justifyContent='flex-end'
              alignItems='stretch'
              spacing={2}
            >
              <CardItem
                id='3-manchas'
                name='Manchas'
                old='4'
                distance='12'
                description='Soy un perro que nunca es agresivo y siempre es amable con las personas y otros animales.'
                aceptado={true}
                url='https://images.dog.ceo/breeds/pointer-german/n02100236_4428.jpg'/>
              <CardItem
                id='4-guri'
                name='Guri'
                old='9'
                distance='18'
                description='Soy un perro que siempre está emocionado por conocer a nuevas personas y le encanta jugar.'
                aceptado={true}
                url='https://images.dog.ceo/breeds/cockapoo/Guri6.jpg'/>
            </Stack>

          </Box>
        </Grid>
      </Grid>
      <div style={{ textAlign: 'center' }}>
        <Button target='_blank' href="https://github.com/fsarnes/tarea-practica-1" variant="outlined" startIcon={<GitHubIcon />} sx={{ fontWeight: '700' }}>
          Repositorio de GitHub
        </Button>
      </div>
    </Box>
  )
}

export default App
