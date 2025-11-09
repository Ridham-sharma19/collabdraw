export default function Input({
  type,
  placeholder,
  onChange,
}: {
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <input
        type={type}
        className="w-full px-4 py-2 rounded-2xl border-black bg-neutral-500"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
