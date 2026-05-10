import { Stack } from "@/app/layout";
import IconButton from "./IconButton";
import BackArrow from "@/assets/back_arrow.svg";
import DoubleDots from "@/assets/double_dots.svg";

interface PageHeaderProps {
  text?: string;
}

const PageHeader = ({ text }: PageHeaderProps) => {
  return (
    <Stack direction="row" centerY spaceBetween>
      <IconButton icon={<img src={BackArrow} />} />
      <h1 className="text-large font-bold">{text}</h1>
      <IconButton icon={<img src={DoubleDots} />} />
    </Stack>
  );
};

export default PageHeader;
