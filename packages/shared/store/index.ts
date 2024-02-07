import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type { EvmAddress, MycelAddress } from '../lib/wallets'

export type EvmDerivedAddresses = {
  version?: string
  [EvmAddress: EvmAddress]: {
    encryptedSignature?: string
    mycelAddress?: MycelAddress
  }
}

export type Authenticator = {
  id: string
  credentialID: Uint8Array
  credentialPublicKey: Uint8Array
  counter: number
  credentialDeviceType: string
  transports?: AuthenticatorTransport[]
}

type StoreState = {
  evmAddress: EvmAddress | undefined
  mycelAddress: MycelAddress | undefined
  // eslint-disable-next-line @typescript-eslint/ban-types
  evmDerivedAddresses: EvmDerivedAddresses | {}
  currentWalletType: string | undefined
  authenticator: Authenticator | undefined
}

type StoreSAction = {
  updateEvmAddress: (address: StoreState['evmAddress']) => void
  updateMycelAddress: (address: StoreState['mycelAddress']) => void
  updateCurrentWalletType: (address: StoreState['currentWalletType']) => void
  updateEvmDerivedAddress: ({
    evmAddress,
    mycelAddress,
    encryptedSignature,
  }: {
    evmAddress: EvmAddress
    mycelAddress?: MycelAddress
    encryptedSignature?: string
  }) => void
  updateAuthenticator: (payload: StoreState['authenticator']) => void
}

export const useStore = create<StoreState & StoreSAction>()(
  devtools(
    persist(
      (set) => ({
        evmAddress: undefined,
        mycelAddress: undefined,
        currentWalletType: undefined,
        evmDerivedAddresses: {},
        dialog: undefined,
        onboardingStatus: undefined,
        authenticator: undefined,
        updateEvmAddress: (payload: EvmAddress | undefined) =>
          set((state) => ({ ...state, evmAddress: payload })),
        updateMycelAddress: (payload: MycelAddress | undefined) =>
          set((state) => ({ ...state, mycelAddress: payload })),
        updateEvmDerivedAddress: ({
          evmAddress,
          mycelAddress,
          encryptedSignature,
        }) =>
          set((state) => ({
            ...state,
            evmDerivedAddresses: {
              ...state.evmDerivedAddresses,
              version: 'v1',
              [evmAddress]: {
                mycelAddress,
                encryptedSignature,
              },
            },
          })),
        updateCurrentWalletType: (payload: string | undefined) =>
          set((state) => ({ ...state, currentWalletType: payload })),
        updateAuthenticator: (payload: Authenticator | undefined) =>
          set((state) => ({ ...state, authenticator: payload })),
      }),
      {
        name: 'mycel',
        partialize: (state) => ({
          evmAddress: state.evmAddress,
          mycelAddress: state.mycelAddress,
          authenticator: state.authenticator,
          evmDerivedAddresses: state.evmDerivedAddresses,
        }),
      }
    )
  )
)