import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";

type Data = { shops: { id: string; name: string }[] };

export const getServerSideProps: GetServerSideProps<{
  data: Data;
}> = async () => {
  const res = await fetch("https://ramen-api.dev/shops");
  const data: Data = await res.json();

  return {
    props: {
      data,
    },
  };
};

function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // will resolve data to type Data
  return (
    <ul>
      {data.shops.map((shop) => (
        <li key={shop.id}>{shop.name}</li>
      ))}
    </ul>
  );
}

export default Page;
