interface NavbarProps {
  name?: string;
  position?: string;
  photo?: string;
  iscenter?: boolean;
}

export function Navbar({ name, position, photo, iscenter }: NavbarProps) {
  return (
    <div className={`pt-2 px-4 w-full bg-white flex flex-col text-left items-${iscenter ? 'center' : 'start'}`}>
      <h1 className="text-6xl  font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
        venturo
      </h1>

      <div className="flex h-auto  flex-row-reverse gap-3">
        <div className="flex py-2  px-2  flex-col">
          <span className="font-semibold text-gray-900">{name || "Dhuta Pratama"}</span>
          <span className="text-md text-gray-500">{position || "Web Programmer"}</span>
        </div>

        <img
          src={photo || "https://i.pravatar.cc/36?img=10"}
          alt={name || "User"}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </div>
  );
}