interface LineProps {
  middleText?: string;
}

const Line = ({ middleText }: LineProps) => {
  return (
    <div className="flex items-center h-12 w-full">
      <hr className="text-gray-700 w-full" />
      {middleText && (
        <>
          <h6 className="px-2 text-small">{middleText}</h6>
          <hr className="text-gray-700 w-full" />
        </>
      )}
    </div>
  );
};

export default Line;
