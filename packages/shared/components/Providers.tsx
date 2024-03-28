import { GrazProvider, WalletType as WalletTypeCosmos } from 'graz'
import { http, createConfig, WagmiProvider } from 'wagmi'
import { mainnet, optimismSepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MYCEL_CHAIN_INFO } from '../lib/wallets'

const queryClient = new QueryClient()

export const wagmiConfig = createConfig({
  chains: [mainnet, optimismSepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
      metadata: {
        icons: [''],
        name: 'SPORE',
        description: 'spore',
        url: 'https://spore.ooo',
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`,
      {
        key: 'alchemy',
      }
    ),
    [optimismSepolia.id]: http(
      `https://opt-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`,
      {
        key: 'alchemy',
      }
    ),
  },
})

export const grazOptions = {
  chains: [MYCEL_CHAIN_INFO],
  defaultWallet: WalletTypeCosmos.KEPLR,
  // walletConnect: {
  //   options: {
  //     projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  //   },
  // },
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <GrazProvider grazOptions={grazOptions}>{children}</GrazProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
