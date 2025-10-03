interface Props {
  params: Promise<{
    category: string;
  }>;
}

const page = async ({ params }: Props) => {
  const { category } = await params;

  return <div>Category: {category}</div>;
};

export default page;
