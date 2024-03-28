import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@/store'

export const Route = createFileRoute('/')({
  beforeLoad: ({ search }) => {
    if (search?.ref) {
      useStore.getState().updateRefCode(search.ref)
    }
  },
})
