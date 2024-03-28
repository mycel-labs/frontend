import { SPORE_TITLE, SPORE_DESCRIPTION } from '@/constants/spore'

export const metadata = {
  title: SPORE_TITLE,
  description: SPORE_DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
