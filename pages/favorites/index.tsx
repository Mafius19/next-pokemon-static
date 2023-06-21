import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'

import { Layout } from '@/components/layouts'
import { NoFavorites } from '@/components/ui'
import { localFavorites } from '@/utils'
import { Grid } from '@nextui-org/react';
import { FavoritePokemons } from '@/components/pokemon'

export const FavoritesPage: NextPage = () => {

  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setfavoritePokemons(localFavorites.pokemons());
  }, [])

  return (
    <Layout title='Pokemons - Favoritos'>
      {
        favoritePokemons.length === 0
          ? (<NoFavorites />)
          : (<FavoritePokemons pokemons={favoritePokemons}/>)
      }
    </Layout>
  )
}

export default FavoritesPage;