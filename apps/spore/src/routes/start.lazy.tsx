import { useState, useEffect } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import ImgIntro from '@/assets/spore-intro.svg'
import ImgLogo from '@/assets/spore-logo.svg'
import { useWallet } from '@/hooks/useWallet'
import { useBalance } from '@/hooks/useMycel'
import { useDomainOwnership } from '@/hooks/useMycel'
import { useVault } from '@/hooks/useVault'
import { toast } from '@/components/ui/sonner'
import { shortAddress } from '@/lib/wallets'
import { copyClipboard, cn } from '@/lib/utils'
import { ClipboardCopy } from 'lucide-react'
import Button from '~/components/Button'
import CelNameForm from '~/components/form/CelName'
import RefCodeForm from '~/components/form/RefCode'
import {
  MYCEL_COIN_DECIMALS,
  MYCEL_HUMAN_COIN_UNIT,
  convertToDecimalString,
} from '@/lib/coin'

export const Route = createLazyFileRoute('/start')({
  component: Start,
})

function Start() {
  return (
    <div className="min-h-screen sm:max-w-screen-sm mx-auto py-8 px-4 sm:px-6">
      <img src={ImgLogo} className="h-16 mx-auto mb-6" />
      <div className="bg-light overlay-dot-ll px-6 py-10 rounded-2xl">
        <img src={ImgIntro} className="mx-auto max-w-sm mt-4 mb-8 px-10" />
        <div>
          <ol className="list-decimal text-xl font-title list-inside space-y-6 px-4">
            <li>
              <Create />
            </li>
            <li>
              <Mint />
            </li>
            <li>
              <MintUSDC />
            </li>
            <li>
              <RegisterCelName />
            </li>
            <li>
              <CheckRefCode />
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

function Create() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { deriveKeys, mycelAccount } = useWallet()

  const createMycelAddress = async () => {
    setIsLoading(false)
    await deriveKeys()
    setIsLoading(true)
    toast(`Created! "${shortAddress(mycelAccount.address ?? 'mycel...')}"`)
  }

  return (
    <>
      <span className={cn(!!mycelAccount?.address && 'line-through')}>
        Create mycel address
      </span>
      {!mycelAccount ? (
        <Button
          type="button"
          isLoading={isLoading}
          className="bg-secondary w-full h-14 mt-2"
          onClick={async () => await createMycelAddress()}
          disabled={!!mycelAccount}
        >
          Create
        </Button>
      ) : (
        <div className="relative">
          <input
            readOnly
            type="text"
            className="w-full mt-2"
            value={shortAddress(mycelAccount.address)}
          />
          <button
            onClick={() => {
              copyClipboard(mycelAccount.address)
              toast(`Address "${shortAddress(mycelAccount.address)}" copied!`)
            }}
          >
            <ClipboardCopy
              strokeWidth={3}
              size={26}
              className="text-light absolute right-5 bottom-4 z-10"
            />
          </button>
        </div>
      )}
    </>
  )
}

function Mint() {
  const THRESHOLD: number =
    import.meta.env.VITE_FAUCET_CLAIMABLE_THRESHOLD ?? 1000000
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isClaimable, setIsClaimable] = useState<boolean>(false)
  const { mycelAccount } = useWallet()
  const { isLoading: isLoadingBalance, data: dataBalance } = useBalance()

  useEffect(() => {
    if (BigInt(dataBalance?.balance?.amount ?? 0) < BigInt(THRESHOLD)) {
      setIsClaimable(true)
    } else {
      setIsClaimable(false)
    }
  }, [isLoadingBalance, dataBalance, THRESHOLD, isClaimable])

  const claimFaucet = async () => {
    if (isClaimable && mycelAccount?.address) {
      await fetch(
        `/api/faucet?address=${mycelAccount?.address}`
      )
        .then((res) => res.json())
        .then((data) => {
          toast(data.response as DeliverTxResponse)
          // setTxResponse(data.response as DeliverTxResponse)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      toast('⚠️ You have enough balance')
      // setTxResponse({
      //   code: -1,
      //   rawLog: 'You have enough balance',
      // } as DeliverTxResponse)
    }
  }

  const mintTestToken = async () => {
    setIsLoading(true)
    try {
      await claimFaucet()
      toast('👌 Minted!')
    } catch (e) {
      toast('⚠️ Mint error!')
    }
    setIsLoading(false)
  }

  return (
    <>
      <span className={cn(!isClaimable ? 'line-through' : undefined)}>
        Mint test token
      </span>
      {!isClaimable ? (
        <p className="text-right font-title text-3xl font-bold">
          {convertToDecimalString(
            dataBalance?.balance?.amount ?? 0,
            MYCEL_COIN_DECIMALS
          )}
          <span className="text-xl ml-1.5">{MYCEL_HUMAN_COIN_UNIT}</span>
        </p>
      ) : (
        <Button
          type="button"
          isLoading={isLoading}
          disabled={!isClaimable}
          className="btn bg-secondary w-full h-14 mt-2"
          onClick={async () => await mintTestToken()}
        >
          Mint
        </Button>
      )}
    </>
  )
}
function MintUSDC() {
  const { faucetUSDC, usdcBalance, isLoadingFaucet, isSuccessFaucet } =
    useVault()
  const [isClaimable, setIsClaimable] = useState<boolean>(false)

  useEffect(() => {
    if (usdcBalance?.data < BigInt(1000 * 1e6)) {
      setIsClaimable(true)
    } else {
      setIsClaimable(false)
    }
  }, [usdcBalance, isClaimable, isLoadingFaucet, isSuccessFaucet])

  return (
    <>
      <span className={cn(!isClaimable ? 'line-through' : undefined)}>
        Mint test token
      </span>
      {!isClaimable ? (
        <p className="text-right font-title text-3xl font-bold">
          {convertToDecimalString(usdcBalance.data ?? 0, MYCEL_COIN_DECIMALS)}
          <span className="text-xl ml-1.5">USDC</span>
        </p>
      ) : (
        <Button
          type="button"
          isLoading={isLoadingFaucet}
          disabled={!isClaimable}
          className="btn bg-secondary w-full h-14 mt-2"
          onClick={async () => await faucetUSDC()}
        >
          Mint USDC
        </Button>
      )}
    </>
  )
}

function RegisterCelName() {
  const { mycelAccount } = useWallet()
  const { isLoading: isLoadingOwnDomain, data: dataOwnDomain } =
    useDomainOwnership(mycelAccount?.address)

  return isLoadingOwnDomain ? null : (
    <>
      <span
        className={cn(
          dataOwnDomain?.domain_ownership?.domains ? 'line-through' : ''
        )}
      >
        Get your name
      </span>
      {dataOwnDomain?.domain_ownership?.domains ? (
        <p className="text-right font-title text-3xl font-bold">
          {dataOwnDomain?.domain_ownership?.domains[0]?.name}.
          {dataOwnDomain?.domain_ownership?.domains[0]?.parent}
        </p>
      ) : (
        <CelNameForm />
      )}
    </>
  )
}

function CheckRefCode() {
  return (
    <>
      <span className={cn('')}>Refferal code</span>
      <RefCodeForm />
    </>
  )
}
