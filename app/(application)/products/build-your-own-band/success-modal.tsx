'use client';

import { Dialog, DialogContent } from '@/components/dialog';
import { useQueryState } from '@/hooks/query-state';

export const SuccessModal: React.FunctionComponent<{ show: boolean }> = ({
  show,
}) => {
  const [success, setSuccess] = useQueryState({
    key: 'success',
    defaultValue: show,
  });

  return (
    <Dialog open={success} onOpenChange={setSuccess}>
      <DialogContent>
        <h2 className='text-lg font-medium text-gray-900'>Success</h2>
        <p className='mt-2 text-sm text-gray-500'>
          Your request was sent. We will get back to you as soon as possible.
        </p>
      </DialogContent>
    </Dialog>
  );
};
