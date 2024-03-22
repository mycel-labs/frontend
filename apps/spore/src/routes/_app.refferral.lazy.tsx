import { createLazyFileRoute } from '@tanstack/react-router'
import { toast } from '@/components/ui/sonner'

export const Route = createLazyFileRoute('/_app/refferral')({
  component: Referral,
})

function Referral() {
  return (
    <div className="py-8 space-y-8">
      <div className="bg-light overlay-dot-ll rounded-xl pb-8">
        <div className="bg-light rounded-xl">
          <h2 className="centerline text-3xl font-bold py-8">Refferral</h2>
        </div>
        <ul className="list-table bg-light mx-4 sm:mx-6">
          <li>
            <div className="header">Invited friends</div>
            <div className="text-right text-3xl font-bold">12</div>
          </li>
          <li>
            <div className="header">Points</div>
            <div className="text-right text-3xl font-bold">100</div>
          </li>
        </ul>
        <div className="px-6 mb-2 mt-8">
          <input
            type="text"
            value="https://spore.xxxx/?invite=akira.cel"
            readOnly
            className="w-full font-lg font-title"
          />
          <button
            className="btn bg-secondary h-14 px-10 font-bold font-title w-full mt-4"
            onClick={() => toast('URL Copied!')}
          >
            <span className="btn-inner" />
            Copy referral url
          </button>
        </div>
      </div>
    </div>
  )
}