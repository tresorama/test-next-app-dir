
export const Card = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div className="p-4 bg-neutral-900 rounded">
      {children}
    </div>
  );
};