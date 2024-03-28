import {
  Tabs,
  TabsList,
  TabsTrigger as TabsTrigger_,
  TabsContent as TabsContent_,
} from '@/components/ui/tabs'
import ImgEnoki from '@/assets/enoki.svg'
import { useVault } from '@/hooks/useVault'
import {
  useFirebaseFunction,
  useGetIndividualLeaderBoard,
} from '@/hooks/useReferral'
import { env } from '@/lib/env'
import { mappedLeaderBoard, mappedTeamLeaderBoard } from '@/types/referral'

export default function BoardTab({
  tab,
}: {
  tab: 'total' | 'team' | 'player' | undefined
}) {
  const fns = useFirebaseFunction({
    projectId: env.firebaseProjectId,
    apiKey: env.firebaseAPIKey,
  })
  const { data, isLoading } = useGetIndividualLeaderBoard(fns)
  const mockLB: mappedLeaderBoard[] = [
    {
      userId: 'akira.cel',
      totalPoints: 200,
    },
    {
      userId: 'taro.cel',
      totalPoints: 190,
    },
    {
      userId: 'yosui.cel',
      totalPoints: 140,
    },
  ]
  const mockTLB: mappedTeamLeaderBoard[] = [
    {
      teamId: 'O2EYDIUcRcVmL5pMehRESerN11LIr6QK',
      teamName: 'Team Awesome',
      totalPoints: 1000,
    },
    {
      teamId: 'H8c1mGSptHxbYLWH51U4Ts4jkLLiXkW6',
      teamName: 'Team Blavo',
      totalPoints: 900,
    },
    {
      teamId: 'oSL4GXoibQ7dJdnAuFoRMvrVGjRzqx5J',
      teamName: 'Team Cool',
      totalPoints: 750,
    },
  ]

  const lb =
    !isLoading && data
      ? (
          data as {
            success: boolean
            data: { leaderBoard: mappedLeaderBoard[] }
          }
        )?.data.leaderBoard
      : mockLB

  const tlb =
    !isLoading && data
      ? (
          data as {
            success: boolean
            data: { leaderBoard: mappedTeamLeaderBoard[] }
          }
        )?.data.leaderBoard
      : mockTLB

  return (
    <Tabs defaultValue={tab ?? 'total'} className="w-full">
      <TabsList className="text-xl bg-transparent space-x-3 font-title">
        <TabsTrigger value="total">
          <span className="btn-inner" />
          Total
        </TabsTrigger>
        <TabsTrigger value="team">
          <span className="btn-inner" />
          Team
        </TabsTrigger>
        <TabsTrigger value="player">
          <span className="btn-inner" />
          Player
        </TabsTrigger>
      </TabsList>
      <TabsContent value="total">
        <TotalTabContent tlb={tlb} />
      </TabsContent>
      <TabsContent value="team">
        <TeamTabContent />
      </TabsContent>
      <TabsContent value="player">
        <PlayerTabContent lb={lb} />
      </TabsContent>
    </Tabs>
  )
}

const TabsTrigger = ({ ...props }) => (
  <TabsTrigger_
    className="btn flex-1 data-[state=inactive]:bg-light h-14 data-[state=active]:bg-secondary data-[state=active]:translate-y-2 data-[state=active]:shadow-solid-xxs uppercase font-bold py-2 px-2.5 relative text-nowrap tracking-tight"
    {...props}
  />
)

const TabsContent = ({ ...props }) => (
  <TabsContent_
    className="bg-light overlay-dot-ll p-6 rounded-xl mt-6 pb-10"
    {...props}
  />
)

const TotalTabContent = ({ tlb }: { tlb: mappedTeamLeaderBoard[] }) => {
  const { drawData, poolBalance, availableYield } = useVault()
  const rows = tlb.map((data) => {
    return (
      <tr className="[&>td]:py-2 [&>td]:px-6" key={data.teamId}>
        <td>{data.teamName}</td>
        <td className="text-right">{data.totalPoints}</td>
      </tr>
    )
  })
  return (
    <>
      <h2 className="centerline text-3xl py-4 font-bold">Total Board</h2>
      <div className="grid grid-cols-4 gap-4">
        <img src={ImgEnoki} />
        <div className="col-span-3 pt-2">
          <ul className="list-table bg-light">
            <li>
              <div className="header">Pool Value</div>
              <div className="text-right text-3xl font-bold">
                ${poolBalance}
              </div>
            </li>
            <li>
              <div className="header">Total Estimated Reward</div>
              <div className="text-right text-3xl font-bold">
                ${availableYield || '0'}
              </div>
            </li>
            <li>
              <div className="header">Payout Date</div>
              <div className="text-right text-3xl font-bold">{drawData}</div>
            </li>
          </ul>
        </div>
      </div>
      <table className="bg-light border-dark border-2 font-title w-full mt-8">
        <tbody>
          <tr className="bg-dark text-light uppercase [&>th]:p-1">
            <th>Team Rank</th>
            <th>Point</th>
          </tr>
          {rows}
        </tbody>
      </table>
    </>
  )
}

const TeamTabContent = () => (
  <>
    <h2 className="centerline text-3xl py-4 font-bold">Team Board</h2>
    <div className="grid grid-cols-4 gap-4">
      <img src={ImgEnoki} />
      <div className="col-span-3 pt-2">
        <ul className="list-table bg-light">
          <li>
            <div className="header">Pool Value</div>
            <div className="text-right text-3xl font-bold">$9,100,000</div>
          </li>
          <li>
            <div className="header">Team member</div>
            <div className="text-right text-3xl font-bold">123</div>
          </li>
          <li>
            <div className="header">Bonus</div>
            <div className="text-right text-3xl font-bold">x 2.15</div>
          </li>
        </ul>
      </div>
    </div>
    <table className="bg-light border-dark border-2 font-title w-full mt-8">
      <tbody>
        <tr className="bg-dark text-light uppercase [&>th]:p-1">
          <th>Player</th>
          <th>Point</th>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>akira.cel</td>
          <td className="text-right">200</td>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>taro.cel</td>
          <td className="text-right">190</td>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>yosui.cel</td>
          <td className="text-right">140</td>
        </tr>
      </tbody>
    </table>
  </>
)

const PlayerTabContent = ({ lb }: { lb: mappedLeaderBoard[] }) => {
  const rows = lb.map((data) => {
    return (
      <tr className="[&>td]:py-2 [&>td]:px-6" key={data.userId}>
        <td>{data.userId}</td>
        <td className="text-right">{data.totalPoints}</td>
      </tr>
    )
  })
  return (
    <>
      <h2 className="centerline font-bold text-3xl py-4">Player Board</h2>
      <table className="bg-light border-dark border-2 font-title w-full mt-4">
        <tbody>
          <tr className="bg-dark text-light uppercase [&>th]:p-1">
            <th>Player</th>
            <th>Point</th>
          </tr>
          {rows}
        </tbody>
      </table>
    </>
  )
}
