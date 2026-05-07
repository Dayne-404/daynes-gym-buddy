interface LineProps {
  middleText?: string;
}

const Line = ({ middleText }: LineProps) => {
  return (
    <div className="flex items-center w-full">
      <hr className="flex-1 border-gray-700" />
      {middleText && <span className="px-2 text-small">{middleText}</span>}
      <hr className="flex-1 border-gray-700" />
    </div>
  );
};

export default Line;
