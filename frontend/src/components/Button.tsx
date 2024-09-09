export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-green-400 hover:bg-green-700 mt-2 px-4 py-2 rounded-md w-full"
    >
      {children}
    </button>
  );
};
