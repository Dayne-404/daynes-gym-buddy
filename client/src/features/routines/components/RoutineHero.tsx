import JumpRope from "@/assets/jump-rope.svg";
import { PageHeader } from "@/components";

const RoutineHero = () => (
  <div className="pt-10 px-8">
    <PageHeader noPadding />
    <img src={JumpRope} alt="Jump Rope" className="w-full h-auto -mb-40" />
  </div>
);

export default RoutineHero;
