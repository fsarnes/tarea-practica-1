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

  const [listaRechazados, setListaRechazados] = useState([]);
  const [listaAceptados, setListaAceptados] = useState([]);

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

  const agregarALista = (accepted) => {
    setDogOk(false);
    if (accepted) {
      setListaAceptados(listaAceptados => [...listaAceptados, dog]);
    } else {
      setListaRechazados(listaRechazados => [...listaRechazados, dog]);
    }
    getDog();
  };

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
              {
                listaRechazados.map((item, index) => (
                  <CardItem key={index}
                    id={item.id}
                    name={item.name}
                    old={item.old}
                    distance={item.distance}
                    description={item.description}
                    accepted={false}
                    url={item.url}/>
                ))
              }
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
              accepted={null}
              add={agregarALista}
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
          <div style={{ textAlign: 'center' }}>
            <br/>
            <Button target='_blank' href="https://github.com/fsarnes/tarea-practica-1" variant="outlined" startIcon={<GitHubIcon />} sx={{ fontWeight: '700' }}>
              Repositorio de GitHub
            </Button>
          </div>
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
              {
                listaAceptados.map((item, index) => (
                  <CardItem key={index}
                    id={item.id}
                    name={item.name}
                    old={item.old}
                    distance={item.distance}
                    description={item.description}
                    accepted={true}
                    url={item.url}/>
                ))
              }
            </Stack>

          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
