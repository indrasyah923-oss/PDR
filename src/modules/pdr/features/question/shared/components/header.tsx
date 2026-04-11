interface NavbarProps {
  centered?: boolean;
  name?: string;
  position?: string;
  photo?: string;
}

export function Navbar({ centered = false, name, position, photo }: NavbarProps) {
  return (
    <div className={`h-full pt-4 px-4 max-w-screen md:py-6 md:px-48 flex flex-col md:flex-row ${centered ? "items-center md:items-center" : "items-start md:items-center"} md:justify-between`}>
      <h1 className="text-5xl py-2 md:py-0 px-2 md:px-0 font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">venturo</h1>
      <div className="flex h-auto items-center flex-row-reverse md:flex-row gap-3">
        <div className={`flex py-2 md:py-0 px-2 md:px-0 flex-col ${centered ? "items-center" : ""}`}>
          <span className="font-semibold text-gray-900">{name || "Dhuta Pratama"}</span>
          <span className="text-sm text-gray-500">{position || "Web Programmer"}</span>
        </div>
        <img 
          src={photo || "https://i.pravatar.cc/36?img=10"}
          alt={name || "User"}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </div>
  )
}