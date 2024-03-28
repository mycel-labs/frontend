import { createLazyFileRoute } from '@tanstack/react-router'
import Profile from '~/components/Profile'
import { Link } from '@tanstack/react-router'
import { useVault } from '@/hooks/useVault'
import { convertToDecimalString } from '@/lib/coin'

export const Route = createLazyFileRoute('/_app/home')({
  component: Home,
})

function Home() {
  const { depositedAmountData, availableYieldData, decimals } = useVault()
  return (
    <div className="py-8 space-y-8">
      <div className="bg-light rounded-xl py-8 overlay-dot-ll">
        <h2 className="centerline text-3xl font-bold">Home</h2>
        <Profile />
        <ul className="list-table mx-4 sm:mx-6 mb-4 bg-light">
          <li>
            <div className="header">Estimated Reward</div>
            <div className="text-right text-3xl font-bold">
              $
              {convertToDecimalString(
                availableYieldData?.data,
                decimals.data
              ) || '0'}
            </div>
          </li>
          <li>
            <div className="header">Deposited USDC</div>
            <div className="text-right text-3xl font-bold">
              $
              {convertToDecimalString(
                depositedAmountData?.data,
                decimals?.data
              ) || '0'}
            </div>
          </li>
        </ul>
        <div className="px-4 sm:px-6 py-2 grid gap-6 grid-cols-2">
          <div className="col-span-2">
            <Link
              type="button"
              className="btn bg-light font-title font-bold px-6 pt-2.5 pb-0.5 w-full flex flex-col leading-none bg-yellow-200"
              to="/referral"
            >
              <span className="btn-inner" />
              <div>Invite Your Friend</div>
              <div className="text-3xl">REFERRAL</div>
            </Link>
          </div>
          <div>
            <Link
              type="button"
              className="btn bg-primary font-title font-bold uppercase px-6 pt-2.5 pb-0.5 w-full flex flex-col leading-none"
              to="/vaults"
            >
              <span className="btn-inner" />
              <div>Deposit</div>
              <div className="text-3xl">USDC</div>
            </Link>
          </div>
          <div>
            <Link
              type="button"
              className="btn bg-secondary font-title font-bold w-full px-6 pt-2.5 pb-0.5 flex flex-col leading-none"
              to="/vaults?t=withdraw"
            >
              <span className="btn-inner" />
              <div>Withdraw</div>
              <div className="text-3xl">USDC</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
