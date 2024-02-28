import { createLazyFileRoute } from '@tanstack/react-router'
import ImgIntro from '@/assets/intro-spore.svg'
import Faq from '~/components/Faq'

export const Route = createLazyFileRoute('/_app/about')({
  component: About,
})

function About() {
  return (
    <div className="bg-light overlay-dot-ll rounded-xl my-6">
      <h2 className="text-center text-2xl font-bold py-8 centerline">About</h2>
      <img src={ImgIntro} className="mx-auto max-w-80 pl-10 pr-5" />
      <div className="py-6">
        <Faq />
      </div>
    </div>
  )
}