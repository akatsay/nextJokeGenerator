const { Configuration, OpenAIApi } = require('openai')

import Link from 'next/link'
import { MainLayout } from '@/Layouts/MainLayout'

import { NextPage, NextPageContext } from 'next'

interface IProps {
  jokeText?: string
  imageURL?: string
  error?: string
}

const JokeImagePage: NextPage<IProps> = ({ jokeText, imageURL, error }) => {
  return (
    <MainLayout title="Joke">
      <div className="image-container">
        {!error ? (
          <img className="image" src={imageURL} alt="AI generated image" />
        ) : (
          <p className="error">Error happened :( try again with another joke</p>
        )}
      </div>
      <div className="joke-description">{jokeText}</div>
      <Link className="link" href={'/jokes'}>
        ⇐ Go back
      </Link>
    </MainLayout>
  )
}

export const getServerSideProps = async ({query}: NextPageContext) => {
  const { jokeText } = query
  const configuration = new Configuration({
    apiKey: process.env.API,
  })
  const openai = new OpenAIApi(configuration)

  const requestParams = {
    prompt: jokeText,
    n: 1,
    size: '512x512',
  }

  try {
    const response = await openai.createImage(requestParams)
    const imageURL = response.data.data[0].url
    return {
      props: {
        jokeText,
        imageURL,
      },
    }
  } catch (error) {
    console.log('Error generating image', error)
    return {
      props: {
        jokeText,
        error: 'Error generating image',
      },
    }
  }
}

export default JokeImagePage
