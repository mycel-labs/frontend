import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'
import { IMG_IDCARD } from '~/images'
import { httpsCallable, getFunctions } from 'firebase/functions'
import { initializeApp } from 'firebase/app'
import {
  getRankFromScore,
  getRankNameFromScore,
  getNextRankFromScore,
} from '@/lib/referral'

export const runtime = 'edge'

async function getUserByReferralCode(ref: string) {
  const app = initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
    apiKey: process.env.FIREBASE_API_KEY,
  })
  const fns = getFunctions(app)
  const fn = httpsCallable(fns, 'getUserByReferralCode')
  const res = await fn({ code: ref })
  return res.data
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ref = searchParams.get('ref')

  // fetch data with ref-code here
  if (!ref) return
  const data = await getUserByReferralCode(ref)
  //@ts-ignore
  const cnt = data?.user?.invitedUserCount ?? 0
  //@ts-ignore
  const name: string = data?.user?.id ?? ''
  const rank: number = getRankFromScore(cnt)
  const rankText: string = getRankNameFromScore(cnt)
  const score: string = `${getNextRankFromScore(cnt).current} /
  ${getNextRankFromScore(cnt).next}`

  // load image for user with score
  const imgChar = await fetch(
    new URL(
      `../../../../../packages/shared/assets/og/char_lv${rank}.png`,
      import.meta.url
    )
  )
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const base64 = Buffer.from(buffer).toString('base64')
      return `data:image/png;base64,${base64}`
    })

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
          <img src={imgChar} width={300} height={400} />
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
            {rankText}
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
