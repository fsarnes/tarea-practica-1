import { useEffect, useState } from 'react';
import './App.css';
import ImgRejected from './assets/rejected.svg';
import ImgAccepted from './assets/accepted.svg';
import CardItem from './components/CardItem';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Grid, Stack, Card, Button, Skeleton } from '@mui/material';
import axios from 'axios';
import dogNames from 'dog-names';

function App() {
  const [dogCount, setDogCount] = useState(0);
  const [dog, setDog] = useState({});
  const [dogOk, setDogOk] = useState(false);
  const [variant, setVariant] = useState('outlined');

  const [rejectedList, setRejectedList] = useState([]);
  const [acceptedList, setAcceptedList] = useState([]);

  const descriptions = [
    'Siempre estoy emocionado de conocer a nuevas personas y hacer amigos.',
    'Soy un perro muy sociable que se lleva bien con otros perros y humanos.',
    'Me encanta jugar y hacer ejercicio con mis amigos humanos y caninos.',
    'Soy un perro que siempre está emocionado por conocer nuevos amigos y me encanta jugar con el agua.',
    'Soy un perro muy leal que siempre está al lado de mis seres queridos.',
    'Siempre estoy dispuesto a hacer nuevos amigos para jugar juntos.',
    'Soy muy amigable con los niños y siempre estoy feliz de jugar con ellos.',
    'Soy un perro muy tranquilo y gentil que nunca mostraría agresividad.',
    'Me encanta acurrucarme y pasar tiempo con mis dueños.',
    'Siempre estoy feliz de dar paseos y explorar el mundo con mi familia.',
    'Soy un perro muy juguetón y siempre estoy dispuesto a compartir mis juguetes.',
    'Siempre estoy dispuesto a hacer nuevos amigos caninos y humanos.',
    'Soy un perro muy amable y me encanta ayudar a mis dueños.',
    'Siempre estoy emocionado de ver a mis seres queridos, incluso si sólo han estado fuera por unos minutos.',
    'Me encanta dar abrazos y besos a mis seres queridos para mostrarles cuánto los quiero.',
    'Soy muy respetuoso con otros animales y siempre me llevo bien con ellos.',
    'Siempre estoy feliz de pasar tiempo al aire libre con mis amigos humanos.',
    'Soy un perro muy enérgico y siempre estoy dispuesto a jugar y correr con mis amigos.',
    'Soy muy protector con mis seres queridos y siempre estoy dispuesto a cuidar de ellos.',
    'Me encanta hacer trucos y mostrarles a todos lo inteligente que soy.',
    'Siempre estoy feliz de hacer nuevos amigos y tengo un gran corazón para todos.',
    'Soy muy amigable con los extraños y siempre estoy dispuesto a darles la bienvenida.',
    'Soy un perro muy feliz que siempre está saltando de alegría.',
    'Siempre estoy dispuesto a compartir mi comida y agua con otros perros.',
    'Soy un perro muy amistoso que siempre está dispuesto a jugar y hacer amigos.',
    'Siempre estoy enfocado en hacer ejercicio y mantenerme en forma.',
    'Soy muy paciente y siempre estoy dispuesto a esperar a mis seres queridos cuando están ocupados.',
    'Me encanta dormir y acompañar a mi familia humana.',
    'Soy un perro muy amable y siempre estoy feliz de recibir caricias y mimos.',
    'Siempre estoy emocionado de salir y explorar nuevos lugares con mi familia.'
  ];

  const getRandomDescription = () => descriptions[Math.floor(Math.random() * descriptions.length)];

  const getDog = () => {
    axios
      .get('https://dog.ceo/api/breeds/image/random')
      .then((response) => {
        let dogName = dogNames.allRandom();
        setDogCount(dogCount + 1);
        setDog({
          id: `${dogCount}-${dogName}`,
          name: dogName,
          age: Math.floor(Math.random() * 17 + 1),
          distance: Math.floor(Math.random() * 30 + 1),
          description: getRandomDescription(),
          url: response.data.message
        });
      });
  };

  useEffect(() => {
    getDog();
  }, []);

  useEffect(() => {
    if (dog.url != undefined) setDogOk(true);
  }, [dog]);

  const addToList = (accepted) => {
    setDogOk(false);
    if (accepted) {
      setAcceptedList(acceptedList => [...acceptedList, dog]);
    } else {
      setRejectedList(rejectedList => [...rejectedList, dog]);
    }
    getDog();
  };

  const changeStatus = (dog) => {
    if (dog.accepted) {
      setRejectedList(rejectedList => [...rejectedList, dog]);
      acceptedList.splice(acceptedList.findIndex(x => x.id == dog.id), 1);
    } else {
      setAcceptedList(acceptedList => [...acceptedList, dog]);
      rejectedList.splice(rejectedList.findIndex(x => x.id == dog.id), 1);
    }
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} lg={3.5} order={{ xs: 2, sm: 1, lg: 1 }}>
          <Box className='container' sx={{ boxShadow: 3 }}>
            <img src={ImgRejected} width='75%' title='' alt='Rechazados' />

            <Stack
              direction='column-reverse'
              justifyContent='flex-end'
              alignItems='stretch'
              spacing={2}
            >
              {
                rejectedList.map((dog, index) => (
                  <CardItem key={index}
                    id={dog.id}
                    name={dog.name}
                    age={dog.age}
                    distance={dog.distance}
                    description={dog.description}
                    accepted={false}
                    changeStatus={changeStatus}
                    url={dog.url}/>
                ))
              }
            </Stack>

          </Box>
        </Grid>
        <Grid item xs={12} sm={4} lg={5} order={{ xs: 1, sm: 2, lg: 2 }}>
          {
            dogOk ?
              <CardItem
              id={dog.id}
              name={dog.name}
              age={dog.age}
              distance={dog.distance}
              description={dog.description}
              accepted={null}
              add={addToList}
              url={dog.url}/>
            :
            <Card className='container__card' sx={{ boxShadow: 3, border: 12, borderColor: 'white' }}>
              <Stack>
                <Skeleton variant='rectangular' sx={{ aspectRatio: '1', height: '100%', marginBottom: '.5rem' }} />
                <Box className='card__content'>
                  <Stack spacing={2.5}>
                    <Stack spacing={4.7}>
                      <Stack spacing={1.5}>
                        <Skeleton variant='rectangular' width='40%' height='1.5rem'/>
                        <Skeleton variant='rectangular' width='60%' height='1.2rem'/>
                      </Stack>
                      <Stack spacing={1}>
                        <Skeleton variant='rectangular' width='90%' height='1rem'/>
                        <Skeleton variant='rectangular' width='90%' height='1rem'/>
                        <Skeleton variant='rectangular' width='30%' height='1rem'/>
                      </Stack>
                    </Stack>
                    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={{ xs: 1.5, lg: 2 }}>
                      <Skeleton variant='rectangular' width='100%' height='2.2rem'/>
                      <Skeleton variant='rectangular' width='100%' height='2.2rem'/>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Card>
          }
          <Box sx={{ textAlign: 'center' }}>
            <br/>
            <Button
              target='_blank'
              href='https://github.com/fsarnes/tarea-practica-1'
              variant={variant}
              startIcon={<GitHubIcon />}
              onMouseOver={() => setVariant('contained')}
              onMouseLeave={() => setVariant('outlined')}
              sx={{ fontWeight: '500' }}
            >
              Repositorio de GitHub
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} lg={3.5} order={{ xs: 3, sm: 3, lg: 3 }}>
          <Box className='container' sx={{ boxShadow: 3 }}>
            <img src={ImgAccepted} width='75%' title='' alt='Aceptados' />

            <Stack
              direction='column-reverse'
              justifyContent='flex-end'
              alignItems='stretch'
              spacing={2}
            >
              {
                acceptedList.map((dog, index) => (
                  <CardItem key={index}
                    id={dog.id}
                    name={dog.name}
                    age={dog.age}
                    distance={dog.distance}
                    description={dog.description}
                    accepted={true}
                    changeStatus={changeStatus}
                    url={dog.url}/>
                ))
              }
            </Stack>

          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App;
