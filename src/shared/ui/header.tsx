interface Props {
  title: string;
}

export function Header(props: Props) {
  const { title } = props;

  return (
    <div className="sticky top-0 z-50 bg-amber-600 text-white shadow-lg">
      <div className="px-4 py-4">
        <h1 className="text-center text-2xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
