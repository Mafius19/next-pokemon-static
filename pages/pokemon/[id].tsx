import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { Pokemon } from '@/interfaces';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths  } from 'next';
import { useRouter } from 'next/router'
import React from 'react'
import { Other } from '../../interfaces/pokemon-full';

interface Props {
  // pokemon: any;
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {

  return (
    <Layout title='Algun Pokemon'>
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
            <Card.Header css={{ display: 'flex', justifyContent:'space-between'}}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>
              <Button
              color='gradient'
              ghost
              >
                Guardar en favoritos
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

  const pokemon1010 = [...Array(151)].map((value,index) => `${index + 1}`);
  
  //al colocar false en la propiedad fallback, si se accede a una ruta no especificada por los parametros
    // la aplicacion dara un 404, en cambio si se coloca "blocking" se dejara pasar aunque no se
    // haya definido parametros para dicha ruta (por ej si el num de pokemon requerido es 9999
    // siendo este pokemon inexistente)
  return {
    paths: pokemon1010.map(id => ({
      params: {id}
    })),
    fallback: false 
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { id } = ctx.params as {id: string}

  const {data} = await pokeApi.get<Pokemon>(`/pokemon/${id}`)

  return {
    props: {
      pokemon: data
    }
  }
}

export default PokemonPage