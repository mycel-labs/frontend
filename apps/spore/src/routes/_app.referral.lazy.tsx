import { createLazyFileRoute } from '@tanstack/react-router'
import { toast } from '@/components/ui/sonner'
import { env } from '@/lib/env'
import {
  useFirebaseFunction,
  useGetUserByReferralCode,
} from '@/hooks/useReferral'
import { copyClipboard } from '@/lib/utils'
import { User } from '@/types/referral'
import { SPORE_SHARE_URL } from '@/constants/spore'

export const Route = createLazyFileRoute('/_app/referral')({
  component: Referral,
})

function Referral() {
  const code = 'REFERRAL_CODE'
  const referralUrl: string = `${SPORE_SHARE_URL}?ref=${code}`
  const fns = useFirebaseFunction({
    projectId: env.firebaseProjectId,
    apiKey: env.firebaseAPIKey,
  })
  const { data, isLoading } = useGetUserByReferralCode(fns, code)
  const invitedUserCount =
    !isLoading && data ? (data as { user: User })?.user?.invitedUserCount : 0

  return (
    <div className="py-8 space-y-8">
      <div className="bg-light overlay-dot-ll rounded-xl pb-8">
        <div className="bg-light rounded-xl">
          <h2 className="centerline text-3xl font-bold py-8">Referral</h2>
        </div>
        <ul className="list-table bg-light mx-4 sm:mx-6">
          <li>
            <div className="header">Invited friends</div>
            <div className="text-right text-3xl font-bold">
              {invitedUserCount}
            </div>
          </li>
          <li>
            <div className="header">Points</div>
            <div className="text-right text-3xl font-bold">
              {invitedUserCount}
            </div>
          </li>
        </ul>
        <div className="px-6 mb-2 mt-8">
          <input
            type="text"
            value={referralUrl}
            readOnly
            className="w-full font-lg font-title"
          />
          <button
            className="btn bg-secondary h-14 px-10 font-bold font-title w-full mt-4"
            onClick={() => {
              copyClipboard(referralUrl)
              toast('URL Copied!')
            }}
          >
            <span className="btn-inner" />
            Copy referral url
          </button>
        </div>
      </div>
    </div>
  )
}
