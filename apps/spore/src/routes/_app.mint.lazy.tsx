import {
  useSwitchChain,
  useSendTransaction,
  useAccount,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { createLazyFileRoute } from '@tanstack/react-router'
import Button from '~/components/Button'
import {
  GetSignatureRequest,
  GetSignatureResponse,
  useCreateAccount,
  useGetSignature,
} from '@/hooks/useSuave'
import { useState } from 'react'
import { shortTx } from '@/lib/wallets'

export const Route = createLazyFileRoute('/_app/mint')({
  component: Mint,
})

// Component
function Mint() {
  const { switchChain } = useSwitchChain()
  const { chainId, address } = useAccount()
  const { data: hash, sendTransaction } = useSendTransaction()
  const [accountId, setAccountId] = useState<string>('')
  const [faAddress, setFaAddress] = useState<string>('')
  const [recipientAddress, setRecipientAddress] = useState<string>('')
  const [signature, setSignature] = useState<GetSignatureResponse | null>(null)
  const { mutateAsync: createAccount, isPending: createAccountPending } =
    useCreateAccount()
  const { mutateAsync: getSignature, isPending: getSignaturePending } =
    useGetSignature()
  const {
    isError: receiptError,
    isLoading: receiptLoading,
    isSuccess: receiptSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  })

  // handleDepositETH is a function to deposit SepETH to TA on Sepolia
  async function handleCreateTA() {
    const account = await createAccount()
    if (account) {
      console.log('Account created:', account)
      setAccountId(account.accountId)
      setFaAddress(account.address)
    } else {
      console.error('Failed to create account')
    }
  }

  async function handleDepositETH() {
    switchChain({ chainId: sepolia.id })
    if (chainId === sepolia.id) {
      // send 1 wei to TA
      if (/^0x[a-fA-F0-9]{40}$/.test(faAddress)) {
        const TA = faAddress as `0x${string}`
        const amount = BigInt('1')
        sendTransaction({
          to: TA,
          value: amount,
          gas: BigInt(21000),
          chainId: sepolia.id,
        })
      } else {
        console.error('Invalid faAddress:', faAddress)
      }
    }
  }

  async function handleSignMintRequest() {
    if (!accountId || !recipientAddress) {
      console.error('Invalid accountId or recipientAddress')
      return
    }
    const body: GetSignatureRequest = {
      recipient: recipientAddress,
      accountId,
    }
    console.log(body)
    const signature: GetSignatureResponse = await getSignature(body)
    console.log('signature:', signature)
    setSignature(signature)
  }

  // handleMintNFT is a function to mint NFT on Sepolia with signature
  async function handleMintNFT() {
    switchChain({ chainId: sepolia.id })
    console.log('mint nft')
  }

  return (
    <div className="py-8 space-y-8">
      <div className="bg-light overlay-dot-ll rounded-xl">
        <h2 className="text-center text-3xl font-bold pt-8 centerline">Mint</h2>
        <div className="pb-4">
          <p className="text-center text-sm px-8 pt-4">
            This feature allows you to mint NFTs on Sepolia Testnet with SUAVE
            Rigil Testnet by using a Transferable Account (TA).
          </p>
          <div className="text-center text-sm px-8">
            For information of Rigil Testnet, see:
          </div>
          <div className="text-center text-sm px-8 text-blue-500 underline font-bold">
            <a
              href="https://suave-alpha.flashbots.net/tutorials/rigil#chain-info"
              target="_blank"
              rel="noreferrer"
            >
              🔗 Rigil Testnet Chain info
            </a>
          </div>
          <p className="text-center text-sm px-8 pt-4">
            <strong>
              Please make sure you have enough SepETH in your TA to mint NFT.
            </strong>
          </p>
        </div>
        <div className="px-8 pb-16">
          <h3 className="text-center text-xl font-bold py-2 centerline">
            Steps
          </h3>
          <ol className="list-decimal text-xl font-title list-inside space-y-6 px-4">
            <li>
              Create Transferable Account (TA)
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleCreateTA()}
                isLoading={createAccountPending}
                success={!!accountId}
              >
                Create
              </Button>
              {accountId && (
                <div className="text-sm m-4">
                  <p>
                    <strong>TA Address:</strong> {faAddress}
                  </p>
                </div>
              )}
            </li>
            <li>
              Deposit SepETH to TA
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleDepositETH()}
                disabled={chainId !== sepolia.id || !faAddress}
                isLoading={receiptLoading}
                success={receiptSuccess}
              >
                {chainId === sepolia.id
                  ? 'Deposit'
                  : 'Change network to Sepolia'}
              </Button>
              {hash && (
                <div className="text-sm m-4">
                  {receiptLoading && (
                    <p>
                      <span role="img" aria-label="success">
                        ⏳
                      </span>{' '}
                      Waiting for transaction to be confirmed...
                    </p>
                  )}
                  {receiptError && (
                    <p>
                      <span role="img" aria-label="success">
                        ❌
                      </span>{' '}
                      Failed to wait for transaction receipt: {receiptError}
                    </p>
                  )}
                  {receiptSuccess && (
                    <p>
                      <span role="img" aria-label="success">
                        ✅
                      </span>{' '}
                      Transaction confirmed!{' '}
                    </p>
                  )}
                  <p>
                    {' '}
                    <a
                      className="text-blue-500 underline"
                      href={`https://sepolia.etherscan.io/tx/${hash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {shortTx(hash)}
                    </a>
                  </p>
                </div>
              )}
            </li>
            <li>
              Sign mint request
              <input
                type="text"
                className="input w-full h-14 mt-2"
                placeholder="Recipient Ethereum Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
              <p className="text-right text-xs p-2">
                <a
                  className="text-blue-500 underline cursor-pointer"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setRecipientAddress(address as `0x${string}`)
                  }}
                >
                  Use connected wallet address
                </a>
              </p>
              {!/^0x[a-fA-F0-9]{40}$/.test(recipientAddress) &&
                recipientAddress && (
                  <p className="text-red-500 text-right text-sm p-2">
                    <span role="img" aria-label="success">
                      ❌
                    </span>{' '}
                    Invalid Ethereum address format
                  </p>
                )}
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleSignMintRequest()}
                disabled={
                  !accountId ||
                  !receiptSuccess ||
                  !recipientAddress ||
                  !/^0x[a-fA-F0-9]{40}$/.test(recipientAddress)
                }
                isLoading={getSignaturePending}
                success={signature}
              >
                Sign
              </Button>
            </li>
            <li>
              Mint NFT
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleMintNFT()}
                disabled={!accountId || !receiptSuccess}
              >
                {chainId === sepolia.id ? 'Mint' : 'Change network to Sepolia'}
              </Button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
