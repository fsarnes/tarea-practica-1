import { useEffect, useState, useRef } from "react";
import "./App.css";
import ImgRejected from "./assets/rejected.svg";
import ImgAccepted from "./assets/accepted.svg";
import CardItem from "./components/CardItem";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Grid, Stack, Card, Button, Skeleton, LinearProgress } from "@mui/material";
import { useDogQuery } from "./helpers/DogQuery";

function App() {
  const [vwidth, setVwidth] = useState(0);
  const ref = useRef(null);
  
  const [rejectedList, setRejectedList] = useState([]);
  const [acceptedList, setAcceptedList] = useState([]);
  
  const { data: dog, isLoading: loading } = useDogQuery({
    dogCount: (rejectedList.length + acceptedList.length + 1)
  });

  useEffect(() => {
    setVwidth(ref.current.clientWidth);
  }, []);

  useEffect(() => {
    const handleWindowResize = () => setVwidth(ref.current.clientWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  });

  const addToList = (accepted) => {
    if (accepted)
      setAcceptedList(acceptedList => [...acceptedList, dog]);
    else
      setRejectedList(rejectedList => [...rejectedList, dog]);
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
    <Box >
      <Grid container spacing={4} ref={ref}>
        <Grid item xs={12} sm={4} lg={5}>
          {
            loading ?
              <Card className="container__card" sx={{ boxShadow: 3, border: 12, borderColor: 'white' }}>
                <LinearProgress />
                <Stack>
                  <Skeleton variant="rectangular" sx={{ aspectRatio: '1', height: '100%', marginBottom: '.5rem' }} />
                  <Box className="card__content">
                    <Stack spacing={2.5}>
                      <Stack spacing={4.7}>
                        <Stack spacing={1.5}>
                          <Skeleton variant="rectangular" width="40%" height="1.5rem" />
                          <Skeleton variant="rectangular" width="60%" height="1.2rem" />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton variant="rectangular" width="90%" height="1rem" />
                          <Skeleton variant="rectangular" width="90%" height="1rem" />
                          <Skeleton variant="rectangular" width="30%" height="1rem" />
                        </Stack>
                      </Stack>
                      <Stack direction="row" spacing={2} justifyContent="center">
                        <Skeleton variant="circular" width="48px" height="48px" />
                        <Skeleton variant="circular" width="48px" height="48px" />
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Card>
            :
              <CardItem
              id={dog.id}
              name={dog.name}
              age={dog.age}
              distance={dog.distance}
              description={dog.description}
              accepted={null}
              add={addToList}
              url={dog.url} />
          }
          <Box sx={{ textAlign: 'center' }}>
            <br />
            <Button
              target="_blank"
              href="https://github.com/fsarnes/tinder-perros"
              variant="contained"
              startIcon={<GitHubIcon />}
              sx={{ fontWeight: '500' }}
            >
              Repositorio de GitHub
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} lg={3.5}>
          <Box className={vwidth < 600 ? 'container-mobile' : 'container'} sx={{ boxShadow: 3 }}>
            <img src={ImgAccepted} width="75%" title="" alt="Aceptados" />
            <Box maxHeight="500px" sx={{ overflow: 'hidden', overflowY: 'auto', filter: 'drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.3))' }}>
              <Stack
                direction="column"
                justifyContent="flex-end"
                alignItems="stretch"
                spacing={2}
              >
                {
                  acceptedList.slice(0).reverse().map(dog => (
                    <CardItem key={dog.id}
                      id={dog.id}
                      name={dog.name}
                      age={dog.age}
                      distance={dog.distance}
                      description={dog.description}
                      accepted
                      changeStatus={changeStatus}
                      url={dog.url} />
                  ))
                }
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} lg={3.5}>
          <Box className={vwidth < 600 ? 'container-mobile' : 'container'} sx={{ boxShadow: 3 }}>
            <img src={ImgRejected} width="75%" title="" alt="Rechazados" />
            <Box maxHeight="500px" sx={{ overflow: 'hidden', overflowY: 'auto', filter: 'drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.3))' }}>
              <Stack
                direction="column"
                justifyContent="flex-end"
                alignItems="stretch"
                spacing={2}
              >
                {
                  rejectedList.slice(0).reverse().map(dog => (
                    <CardItem key={dog.id}
                      id={dog.id}
                      name={dog.name}
                      age={dog.age}
                      distance={dog.distance}
                      description={dog.description}
                      accepted={false}
                      changeStatus={changeStatus}
                      url={dog.url} />
                  ))
                }
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App;
