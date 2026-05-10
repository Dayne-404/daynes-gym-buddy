import { useNavigate } from "react-router-dom";
import { Stack } from "@/app/layout";
import IconButton from "./IconButton";
import BackArrow from "@/assets/back_arrow.svg";
import DoubleDots from "@/assets/double_dots.svg";

interface PageHeaderProps {
  text?: string;
}

const PageHeader = ({ text }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" centerY spaceBetween className="pb-8">
      <IconButton icon={<img src={BackArrow} />} onClick={() => navigate(-1)} />
      <h1 className="text-large font-bold">{text}</h1>
      <IconButton icon={<img src={DoubleDots} />} />
    </Stack>
  );
};

export default PageHeader;
