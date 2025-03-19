'use client';

import { useEffect, useRef, useActionState } from 'react';
import Button from './Button';
import { toast } from 'react-hot-toast';

export default function Modal({ isOpen, onClose, onConfirm, message, id }) {
  const modalRef = useRef();
  const [formState, formAction] = useActionState(onConfirm, {});
  const lastToastRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    if (formState.error && lastToastRef.current !== formState.error) {
      toast.error(formState.error);
      lastToastRef.current = formState.error;
      onClose();
    }

    if (formState.success && lastToastRef.current !== formState.success) {
      toast.success(formState.success);
      lastToastRef.current = formState.success; // Store last success to avoid duplicate toasts
      onClose();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, formState]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="mt-4 mb-8">{message}</div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <Button
              variation="secondary"
              type="submit"
              className="self-start bg-primary-150"
            >
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
