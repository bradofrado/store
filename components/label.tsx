export const Label: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <label className='block text-sm font-medium leading-6 text-gray-900'>
      {children}
    </label>
  );
};
