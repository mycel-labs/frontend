export const SPORE_MAX_REDEMPTIONS: number[] = [
  0, 1, 3, 5, 10, 30, 50, 80, 100, 150, 300,
]

export const SPORE_RANK_NAME: any[] = [
  'A Spore', // >=0
  'Mycelian', // >=1
  'Fungi Friends', // >=3
  'Fungiant', // >=5
  'Shroom Monk', // >=10
  'Fungi Wizard', // >=30
  'Mycel Devil', // >=50
  'Funghidorah', // >=80
  'Shroominati', // >=100
  'Shroomartian', // >=150
]

export const getRankFromScore = (count: number): number => {
  let rank = 0
  for (let i = 0; i < SPORE_MAX_REDEMPTIONS.length; i++) {
    if (count >= SPORE_MAX_REDEMPTIONS[i]) {
      rank = i
    }
  }
  return rank
}

export const getRankNameFromScore = (count: number): string => {
  const rank: number = getRankFromScore(count)
  return SPORE_RANK_NAME[rank]
}

export const getNextRankFromScore = (count: number) => {
  const rank: number = getRankFromScore(count)
  return {
    current: count,
    next: SPORE_MAX_REDEMPTIONS[rank + 1],
  }
}
