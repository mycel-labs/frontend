import { redirect } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'
import { SPORE_DOMAIN } from '@/constants/spore'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    openGraph: {
      images: [
        searchParams.ref
          ? `/api/og?ref=${searchParams.ref}`
          : `${SPORE_DOMAIN}/og.png`,
      ],
    },
  }
}

export default function Page({ searchParams }: Props) {
  // if (!searchParams.ref) {
  //   redirect(SPORE_DOMAIN)
  // } else {
  //   redirect(`${SPORE_DOMAIN}/s?ref=${searchParams.ref}`)
  // }
}
