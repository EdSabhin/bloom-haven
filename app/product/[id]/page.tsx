"use client";

import SingleProductView from "@/src/components/sections/SingleProductView";

const page = ({ params }: { params: { id: number } }) => {
  const id = params?.id;

  return (
    <>
      <SingleProductView id={id} />
    </>
  );
};

export default page;
