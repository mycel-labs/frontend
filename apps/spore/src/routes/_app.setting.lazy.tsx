import { createLazyFileRoute } from '@tanstack/react-router'
import { UserCog, FileSignature, ClipboardCopy, LogOut } from 'lucide-react'
import Profile from '~/components/Profile'
import { useWallet } from '@/hooks/useWallet'
import { useDomainOwnership } from '@/hooks/useMycel'
import { shortAddress } from '@/lib/wallets'
import { copyClipboard } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import { toast } from '@/components/ui/sonner'

const MENU_ITEMS = [
  {
    id: 'editProfile',
    text: 'Edit profile',
    href: '/setting/profile',
    icon: <UserCog size={28} strokeWidth={3} />,
  },
  {
    id: 'editAddress',
    text: 'Edit address',
    href: 'setting/address',
    icon: <FileSignature size={28} strokeWidth={3} />,
  },
]

export const Route = createLazyFileRoute('/_app/setting')({
  component: Setting,
})

function Setting() {
  const { evmAddress, mycelAccount } = useWallet()
  const mycelAddress = mycelAccount?.address
  const { disconnectWallet } = useWallet()
  const navigate = useNavigate()

  const handleSignout = async (): Promise<void> => {
    await disconnectWallet()
    navigate({ to: '/' })
  }

  return (
    <div className="py-8 space-y-8">
      <div className="bg-light overlay-dot-ll rounded-xl py-8">
        <h2 className="centerline font-bold text-3xl">Setting</h2>
        <Profile />
        {/* <div className="space-y-6 py-6 px-6">
          {MENU_ITEMS.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </div> */}
        <ul className="list-table mx-4 sm:mx-6 mt-6 bg-light">
          {mycelAddress && (
            <li>
              <div className="header px-4">Mycel Address</div>
              <div className="px-4 flex justify-between items-center text-2xl">
                {shortAddress(mycelAddress, 10, 6)}
                <button
                  className="px-2.5 py-1 -mt-2 text-sm uppercase font-bold hover:opacity-90"
                  onClick={() => {
                    copyClipboard(mycelAddress)
                    toast('Address copied!')
                  }}
                >
                  <ClipboardCopy size={28} strokeWidth={3} />
                </button>
              </div>
            </li>
          )}
          {evmAddress && (
            <li>
              <div className="header px-4">EVM Address</div>
              <div className="px-4 flex justify-between items-center text-2xl">
                {shortAddress(evmAddress, 10, 6)}
                <button
                  className="px-2.5 py-1 -mt-2 text-sm uppercase font-bold hover:opacity-90"
                  onClick={() => {
                    copyClipboard(evmAddress)
                    toast('Address copied!')
                  }}
                >
                  <ClipboardCopy size={28} strokeWidth={3} />
                </button>
              </div>
            </li>
          )}
        </ul>
        <div className="px-4 sm:px-6 pb-6">
          <button
            onClick={handleSignout}
            className="btn bg-secondary py-2 px-6 h-14 w-full mt-6"
          >
            <span className="btn-inner" />
            <div className="flex items-center font-title text-xl">
              <LogOut size={28} strokeWidth={3} className="mr-4" />
              LogOut
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

const ListItem = ({ item }: { item: any }) => (
  <a href={item.href} className="btn bg-secondary py-2 px-6 h-14">
    <span className="btn-inner" />
    <div className="flex items-center font-title text-xl">
      <span className="mr-4">{item.icon}</span>
      {item.text}
    </div>
  </a>
)
