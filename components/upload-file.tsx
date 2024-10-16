'use client';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface UploadFileProps {
  onChange: (file: File) => void;
}
export const UploadFile: React.FunctionComponent<UploadFileProps> = ({
  onChange,
}) => {
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    onChange(file);
  };
  return (
    <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
      <div className='text-center'>
        <PhotoIcon
          aria-hidden='true'
          className='mx-auto h-12 w-12 text-gray-300'
        />
        <div className='mt-4 flex text-sm leading-6 text-gray-600'>
          <label
            htmlFor='file-upload'
            className='relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-lighter'
          >
            <span>Upload a file</span>
            <input
              id='file-upload'
              name='file-upload'
              type='file'
              className='sr-only'
              onChange={onSelectImage}
            />
          </label>
          <p className='pl-1'>or drag and drop</p>
        </div>
        <p className='text-xs leading-5 text-gray-600'>
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  );
};
