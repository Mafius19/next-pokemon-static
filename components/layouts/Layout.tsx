import Head from "next/head"
import { FC } from "react"
import { Navbar } from "../ui";

interface Props {
  children: JSX.Element;
  title?: string;
}
export const Layout: FC<Props> = ({ children, title }) => {

  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="Matias Guerrero"/>
        <meta name="description" content={`Información sobre el pokémon ${title}`}/>
        <meta name="keywords" content={`${title}, pokemon, pokedex`}/>
      </Head>

      <Navbar/>
      {/* Navbar */}

      <main style={{
        padding: '0px 20px'
      }}>
        {children}
      </main>
    </>
  )
}
