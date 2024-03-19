import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'
import { IMG_IDCARD } from '~/images'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ref = searchParams.get('ref')

  // fetch data with ref-code here
  const name: string = 'akira.cel'
  const rank: string = 'Noob'
  const score: string = '1000 / 10000'

  const imgChar1 = await fetch(
    new URL(
      '../../../../../packages/shared/assets/og/char1.png',
      import.meta.url
    )
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          backgroundColor: '#ff4615',
          color: '#000050',
          backgroundImage: `url(${IMG_IDCARD})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '300',
            height: '400',
            marginTop: '141',
            marginLeft: '182',
          }}
        >
          <img src={imgChar1} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '178',
            marginLeft: '28',
            width: '490',
          }}
        >
          <div
            style={{
              fontSize: '42',
              fontWeight: 'bold',
              // background: 'blue',
              textAlign: 'center',
              padding: '12px 24px',
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: '36',
              marginTop: '55',
              padding: '8px 24px',
              // background: 'blue',
            }}
          >
            {rank}
          </div>
          <p
            style={{
              fontSize: '36',
              marginTop: '40',
              padding: '8px 24px',
              // background: 'blue',
            }}
          >
            {score}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
