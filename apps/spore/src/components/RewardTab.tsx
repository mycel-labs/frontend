import {
  Tabs,
  TabsList,
  TabsTrigger as TabsTrigger_,
  TabsContent as TabsContent_,
} from '@/components/ui/tabs'
import useConfetti from '@/hooks/useConfetti'
import { useVault } from '@/hooks/useVault'
import { convertToDecimalString } from '@/lib/coin'
import { convertUnixToUTC } from '@/lib/converter'
import { useState } from 'react'

export default function RewardTab({ tab }: { tab: 'withdraw' | undefined }) {
  return (
    <Tabs
      defaultValue={tab === 'withdraw' ? 'withdraw' : 'deposit'}
      className="w-full"
    >
      <TabsList className="text-xl bg-transparent space-x-3 font-title">
        <TabsTrigger value="deposit">
          <span className="btn-inner" />
          Deposit
        </TabsTrigger>
        <TabsTrigger value="withdraw">
          <span className="btn-inner" />
          Withdraw
        </TabsTrigger>
        <TabsTrigger value="claim">
          <span className="btn-inner" />
          Claim
        </TabsTrigger>
      </TabsList>
      <TabsContent value="deposit">
        <DepositTabContent />
      </TabsContent>
      <TabsContent value="withdraw">
        <WithdrawTabContent />
      </TabsContent>
      <TabsContent value="claim">
        <ClaimTabContent />
      </TabsContent>
    </Tabs>
  )
}

const TabsTrigger = ({ ...props }) => (
  <TabsTrigger_
    className="btn flex-1 data-[state=inactive]:bg-light h-14 data-[state=active]:bg-secondary data-[state=active]:translate-y-2 data-[state=active]:shadow-solid-xxs uppercase font-bold py-2 relative"
    {...props}
  />
)

const TabsContent = ({ ...props }) => (
  <TabsContent_
    className="bg-light overlay-dot-ll p-6 rounded-xl mt-6"
    {...props}
  />
)

const DepositTabContent = () => {
  const { runConfetti, runSparkles } = useConfetti()
  const [amount, setAmount] = useState<number>(0)
  const {
    depositUSDC,
    approveUSDC,
    poolbalanceData,
    availableYieldData,
    currentDrawData,
    approvalData,
    usdcBalance,
    decimals,
  } = useVault()

  return (
    <>
      <ul className="list-table bg-light">
        <li className="p-0">
          <div className="header">Estimated Reward</div>
          <div className="text-right font-bold text-3xl">
            $
            {convertToDecimalString(availableYieldData?.data, decimals?.data) ||
              '0'}
          </div>
        </li>
        <li>
          <div className="header">Total Pool</div>
          <div className="text-right font-bold text-3xl">
            $
            {convertToDecimalString(poolbalanceData?.data, decimals?.data) ||
              '0'}
          </div>
        </li>
        <li>
          <div className="header">Payout Date</div>
          {currentDrawData?.data == BigInt(0) ? (
            <div className="text-right font-bold text-3xl">not started</div>
          ) : (
            <div className="text-right font-bold text-3xl">
              {convertUnixToUTC(currentDrawData?.data) || 'not started'}
            </div>
          )}
        </li>
      </ul>
      <div className="border-dark bg-light border-2 rounded px-6 py-8 mt-6">
        <h2 className="centerline text-3xl font-bold pb-2">Deposit</h2>
        <p
          className="text-right p-1 cursor-pointer"
          onClick={() =>
            setAmount(
              Number(convertToDecimalString(usdcBalance?.data, decimals?.data))
            )
          }
        >
          Balance:
          {convertToDecimalString(usdcBalance?.data, decimals?.data) || '0'}
        </p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {approvalData.data > BigInt(amount * 1e6) ? (
          <button
            className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
            onClick={(e) => {
              depositUSDC(amount)
              runConfetti(e)
            }}
          >
            <span className="btn-inner" />
            Deposit
          </button>
        ) : (
          <button
            className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
            onClick={(e) => {
              approveUSDC()
              runConfetti(e)
            }}
          >
            <span className="btn-inner" />
            Approve
          </button>
        )}
      </div>
    </>
  )
}

const WithdrawTabContent = () => {
  const { runSparkles } = useConfetti()
  const { depositedAmountData, decimals, withdrawUSDC } = useVault()
  const [amount, setAmount] = useState(0)

  return (
    <>
      <div className="border-dark bg-light border-2 rounded px-6 pb-8">
        <h2 className="centerline font-bold text-2xl pt-6 pb-4">Withdraw</h2>
        <p
          className="text-right p-1 cursor-pointer"
          onClick={() =>
            setAmount(
              Number(
                convertToDecimalString(
                  depositedAmountData?.data,
                  decimals?.data
                )
              )
            )
          }
        >
          Balance:
          {convertToDecimalString(depositedAmountData?.data, decimals?.data) ||
            '0'}
        </p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
          onClick={(e) => {
            withdrawUSDC(amount)
            runSparkles(e)
          }}
        >
          <span className="btn-inner" />
          Withdraw
        </button>
      </div>
    </>
  )
}
const ClaimTabContent = () => {
  const { runSparkles } = useConfetti()
  const { claimablePrizeData, claimPrizeUSDC, decimals } = useVault()
  const [amount, setAmount] = useState(0)

  return (
    <>
      <div className="border-dark bg-light border-2 rounded px-6 pb-8">
        <h2 className="centerline font-bold text-2xl pt-6 pb-4">Claim Prize</h2>
        <p
          className="text-right p-1 cursor-pointer"
          onClick={() =>
            setAmount(
              Number(
                convertToDecimalString(claimablePrizeData?.data, decimals?.data)
              )
            )
          }
        >
          Balance:
          {convertToDecimalString(claimablePrizeData?.data, decimals?.data) ||
            '0'}
        </p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {claimablePrizeData?.data &&
        BigInt(claimablePrizeData?.data) > BigInt(0) ? (
          <button
            className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
            onClick={(e) => {
              claimPrizeUSDC(amount)
              runSparkles(e)
            }}
          >
            <span className="btn-inner" />
            Claim Prize
          </button>
        ) : (
          <button className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6">
            <span className="btn-inner" />
            Not eligible
          </button>
        )}
      </div>
    </>
  )
}
