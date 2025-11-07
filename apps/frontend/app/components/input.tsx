

export default function Input({type,placeholder}:{type:string,placeholder:string}) {
  return (
    <div>
        <input type={type} className="w-full px-4 py-2 rounded-2xl" placeholder={placeholder} />
    </div>
  )
}
