import SkeletonButton from "@/components/skeletons/skeleton-button";
import SkeletonCartTotals from "@/components/skeletons/skeleton-cart-totals";
import SkeletonCodeForm from "@/components/skeletons/skeleton-code-form";

const SkeletonOrderSummary = () => {
  return (
    <div className="flex w-full flex-col gap-2 large:w-[326px] xl:w-[437px]">
      <SkeletonCodeForm />
      <div className="flex animate-pulse flex-col gap-5 bg-skeleton-primary p-5">
        <SkeletonCartTotals header={false} />
        <SkeletonButton />
      </div>
    </div>
  );
};

export default SkeletonOrderSummary;
