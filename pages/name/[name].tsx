import React, { useEffect, useState } from 'react'

import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths  } from 'next';

import confetti from 'canvas-confetti';

import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { Pokemon, PokemonListResponse } from '@/interfaces';
import { getPokemonInfo, localFavorites } from '@/utils';

interface Props {
  // pokemon: any;
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({pokemon}) => {

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))
  
  const onToggleFavorite = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setIsInFavorites(!isInFavorites)
    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x:1,
        y:0,
      }
    })
  }

  console.log({existeWindow: typeof window})

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{mt: '5px'}} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{p:'30px'}}>
            <Card.Body>
              <Card.Image 
              src={pokemon.sprites.other?.dream_world.front_default || '/no-image.pmg'}
              alt={pokemon.name}
              width='100%'
              height={200}
              />
            </Card.Body>

          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card isHoverable css={{p:'30px'}}>
            <Card.Header css={{ display: 'flex', justifyContent:'space-between', flexDirection: 'column'}}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>
              <Button
              color='gradient'
              ghost={ !isInFavorites }
              onClick={onToggleFavorite}
              >
                {isInFavorites? 'En Favoritos': 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display='flex' direction='row'>
                <Image
                  src={pokemon.sprites?.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites?.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites?.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites?.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
              
            </Card.Body>

          </Card>
        </Grid>
      </Grid.Container>

    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

 const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemon1010 = [...Array(151)].map((value, index) => `${data.results[index].name}`);
  
  //al colocar false en la propiedad fallback, si se accede a una ruta no especificada por los parametros
    // la aplicacion dara un 404, en cambio si se coloca "blocking" se dejara pasar aunque no se
    // haya definido parametros para dicha ruta (por ej si el num de pokemon requerido es 9999
    // siendo este pokemon inexistente)
  return {
    paths: pokemon1010.map(name => ({
      params: {name}
    })),
    fallback: false 
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { name } = ctx.params as {name: string}

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    }
  }
}

export default PokemonByNamePage