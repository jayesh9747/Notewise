"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PageHeading = ({
  title,
  goBack = false,
}: {
  title: string;
  goBack?: boolean;
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      {goBack && (
        <ChevronLeft
          className="w-5 h-5 cursor-pointer"
          onClick={() => router.back()}
        />
      )}
      <h1 className="text-2xl font-medium my-5">{title}</h1>
    </div>
  );
};

export default PageHeading;
