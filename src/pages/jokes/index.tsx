import axios from 'axios'
import Link from 'next/link'
import { Joke } from '../../components/Joke'
import { MainLayout } from '@/Layouts/MainLayout'

import { NextPage } from 'next'

export interface Ijokes {
  category: string
  flags: {
    explicit: boolean
    nsfw: boolean
    political: boolean
    racist: boolean
    religious: boolean
    sexist: boolean
  }
  id: number
  lang: string
  safe: boolean
  joke: string
  type: string
}

interface IProps {
  jokes: Ijokes[]
  error: string
}

const JokesPage: NextPage<IProps> = ({ jokes, error }) => {
  if (error) {
    return (
      <>
        <p className="error">
          {"Couldn't upload jokes at this time, try again :("}
        </p>
        <Link className="link" href={'../'}>
          ⇐ Go back
        </Link>
      </>
    )
  }

  return (
    <>
      <MainLayout title="Jokes">
        <Link className="link" href={'../'}>
          ⇐ Go back
        </Link>
        {jokes.map((joke) => {
          return <Joke key={joke.id} id={joke.id} jokeText={joke.joke} />
        })}
      </MainLayout>
    </>
  )
}

export const getServerSideProps = async () => {
  const options = {
    method: 'GET',
    url: 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=10',
  }

  try {
    const response = await axios.request(options)
    const jokes: Ijokes = response.data.jokes
    return {
      props: {
        jokes,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        error,
      },
    }
  }
}

export default JokesPage
