import { useEffect } from 'react'
import { useWallet } from './useWallet'
import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { toast } from '../components/ui/sonner'

import { usdcContract } from '../constants/testUSDC'
import { vaultContract } from '../constants/vault'
import { faucetContract } from '../constants/faucet'

export const useVault = () => {
  const { evmAddress } = useWallet()

  /* Write contract*/
  const { data: depositHash, writeContract: deposit } = useWriteContract()
  const { data: withdrawHash, writeContract: withdraw } = useWriteContract()
  const { data: approvalHash, writeContract: approve } = useWriteContract()
  const { data: faucetHash, writeContract: faucet } = useWriteContract()
  const { data: claimPrizeHash, writeContract: claimPrize } = useWriteContract()

  const { isLoading: isLoadingDeposit, isSuccess: isSuccessDeposit } =
    useWaitForTransactionReceipt({
      hash: depositHash,
    })

  const { isLoading: isLoadingWithdraw, isSuccess: isSuccessWithdraw } =
    useWaitForTransactionReceipt({
      hash: withdrawHash,
    })

  const { isLoading: isLoadingApproval, isSuccess: isSuccessApproval } =
    useWaitForTransactionReceipt({
      hash: approvalHash,
    })

  const { isLoading: isLoadingClaimPrize, isSuccess: isSuccessClaimPrize } =
    useWaitForTransactionReceipt({
      hash: claimPrizeHash,
    })
  const { isLoading: isLoadingFaucet, isSuccess: isSuccessFaucet } =
    useWaitForTransactionReceipt({
      hash: faucetHash,
    })

  /* Read contract*/
  const depositedAmountData = useReadContract({
    ...vaultContract,
    functionName: 'balanceOf',
    args: [evmAddress],
  })

  const poolbalanceData = useReadContract({
    ...vaultContract,
    functionName: 'totalSupply',
  })

  const availableYieldData = useReadContract({
    ...vaultContract,
    functionName: 'availableYieldBalance',
  })
  const currentDrawIdData = useReadContract({
    ...vaultContract,
    functionName: 'currentDrawId',
  })

  const currentDrawData = useReadContract({
    ...vaultContract,
    functionName: 'getCurrentDrawEndTime',
  })
  const claimablePrizeData = useReadContract({
    ...vaultContract,
    functionName: '_claimablePrize',
    args: [evmAddress],
  })

  const approvalData = useReadContract({
    ...usdcContract,
    functionName: 'allowance',
    args: [evmAddress, vaultContract.address],
  })

  const usdcBalance = useReadContract({
    ...usdcContract,
    functionName: 'balanceOf',
    args: [evmAddress],
  })
  const decimals = useReadContract({
    ...usdcContract,
    functionName: 'decimals',
  })

  /* Async functions */
  async function depositUSDC(amount: number) {
    if (!amount || amount == 0) return
    const fixedAmount = BigInt(amount * 1e6)
    deposit(
      {
        ...vaultContract,
        functionName: 'deposit',
        args: [fixedAmount, evmAddress],
      },
      {
        onSuccess: () => toast('Transaction sent!'),
        onError: (err) => toast(`Deposit error! ${err}`),
      }
    )
  }

  async function withdrawUSDC(amount: number) {
    if (!amount || amount == 0) return
    const fixedAmount = BigInt(amount * 1e6)
    withdraw(
      {
        ...vaultContract,
        functionName: 'withdraw',
        args: [fixedAmount, evmAddress, evmAddress],
      },
      {
        onSuccess: () => toast('Transaction sent!'),
        onError: (err) => toast(`Withdraw error! ${err}`),
      }
    )
  }

  async function claimPrizeUSDC(amount: number) {
    if (!amount || amount == 0) return
    const fixedAmount = BigInt(amount * 1e6)
    claimPrize({
      ...vaultContract,
      functionName: 'claimPrize',
      args: [fixedAmount],
    })
  }

  async function approveUSDC() {
    const fixedAmount = 1000000 * 1e6
    approve(
      {
        ...usdcContract,
        functionName: 'approve',
        args: [vaultContract.address, fixedAmount],
      },
      {
        onSuccess: () => toast('Transaction sent!'),
        onError: (err) => toast(`Approval error! ${err}`),
      }
    )
  }

  async function faucetUSDC() {
    faucet(
      {
        ...faucetContract,
        functionName: 'drip',
        args: [usdcContract.address],
      },
      {
        onSuccess: () => toast('Transaction sent!'),
        onError: (err) => toast(`Faucet error! ${err}`),
      }
    )
  }

  useEffect(() => {
    if (isSuccessDeposit) {
      toast('Deposit successful')
    }
  }, [isSuccessDeposit])

  useEffect(() => {
    if (isSuccessWithdraw) {
      toast('Withdraw successful')
    }
  }, [isSuccessWithdraw])

  useEffect(() => {
    if (isSuccessApproval) {
      toast('Approval successful')
    }
  }, [isSuccessApproval])

  useEffect(() => {
    if (isSuccessClaimPrize) {
      toast('Claim Prize successful')
    }
  }, [isSuccessClaimPrize])

  useEffect(() => {
    if (isSuccessFaucet) {
      toast('Faucet successful')
    }
  }, [isSuccessFaucet])

  return {
    depositUSDC,
    withdrawUSDC,
    claimPrizeUSDC,
    approveUSDC,
    faucetUSDC,
    isSuccessFaucet,
    isLoadingFaucet,
    depositedAmountData,
    poolbalanceData,
    availableYieldData,
    currentDrawData,
    claimablePrizeData,
    approvalData,
    usdcBalance,
    decimals,
  }
}
