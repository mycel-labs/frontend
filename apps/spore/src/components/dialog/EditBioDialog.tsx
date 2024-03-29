import BaseDialog from './BaseDialog'
import { Dialog } from '@headlessui/react'

// Upload avatar, bio
export default function EditBioDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  return (
    <BaseDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Title className="text-lg font-semibold">Edit Bio</Dialog.Title>
      <div className="flex flex-row justify-between">
        <button
          className="px-2 h-12 btn-solid bg-gray-100 text-lg items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-2 h-12 btn-solid bg-primary text-lg items-center gap-2"
          // onClick={() => handleClick()}
        >
          Confirm
        </button>
      </div>
    </BaseDialog>
  )
}
