import { useQuery, useMutation } from '@tanstack/react-query'
import { callFn } from '../lib/firebase'
import { LeaderBoard, TotalLeaderBoard } from '@/types/referral'

export const useGetUser = (uid: string) => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryGetUser', uid],
    queryFn: async () => {
      const fn = callFn('getUser')
      const res = await fn({ uid })
      return res.data
    },
    enabled: !!uid,
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

export const useGetUserByReferralCode = (referralCode: string) => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryGetUserByReferralCode', referralCode],
    queryFn: async () => {
      const fn = callFn('getUserByReferralCode')
      const res = await fn({ code: referralCode })
      return res.data
    },
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

// Referral Codes
export const useGetReferralCodeByIssuerUserId = (issuerUserId: string) => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryGetReferralCodeByIssuerUserId', issuerUserId],
    queryFn: async () => {
      const fn = callFn('getReferralCodeByIssuerUserId')
      const res = await fn({ uid: issuerUserId })
      return res.data
    },
    enabled: !!issuerUserId,
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

// Leader Boards
export const useGetIndividualLeaderBoard = () => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryGetIndividualLeaderBoard'],
    queryFn: async () => {
      const fn = callFn('getIndividualLeaderBoard')
      const res = await fn()
      return res.data.data.leaderBoard as LeaderBoard[]
    },
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

export const useGetTeamLeaderBoardByUserId = (uid: string) => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryGetTeamLeaderBoardByUserId', uid],
    queryFn: async () => {
      if (!uid) return []
      const fn = callFn('getTeamLeaderBoardByUserId')
      const res = await fn({ uid })
      return res.data.data.leaderBoard as LeaderBoard[]
    },
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

export const useGetTotalLeaderBoard = () => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryGetTotalLeaderBoard'],
    queryFn: async () => {
      const fn = callFn('getTotalLeaderBoard')
      const res = await fn()
      return res.data.data.leaderBoard as TotalLeaderBoard[]
    },
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}
