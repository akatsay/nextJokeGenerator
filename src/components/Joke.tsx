import Link from 'next/link'

export interface IProps {
  id: number | undefined
  jokeText: string | undefined
}

export function Joke({ id, jokeText }: IProps) {
  return (
    <>
      <Link
        className="joke-link"
        href={{ pathname: `./jokes/${id}`, query: { jokeText } }}
      >
        <div className="joke">{jokeText}</div>
      </Link>
    </>
  )
}
