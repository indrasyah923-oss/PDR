interface NavbarProps {
  centered?: boolean;
  mobileCentered?: boolean;
  desktopCentered?: boolean;
  name?: string;
  position?: string;
  photo?: string;
}

export function Navbar({
  centered = false,
  mobileCentered,
  desktopCentered,
  name,
  position,
  photo,
}: NavbarProps) {
  const isMobileCentered = mobileCentered ?? centered;
  const isDesktopCentered = desktopCentered ?? centered;

  const direction = isDesktopCentered ? "md:flex-col" : "md:flex-row";
  const alignMobile = isMobileCentered ? "items-center" : "items-start";
  const alignDesktop = isDesktopCentered ? "md:items-center md:justify-center" : "md:items-center md:justify-between";
  const userInfoDirection = isDesktopCentered ? "md:flex-row-reverse" : "md:flex-row";
  const textAlign = isDesktopCentered ? "md:items-start" : "";

  return (
    <div className={`pt-2 px-4 max-w-screen  md:px-48 flex flex-col ${direction} ${alignMobile} ${alignDesktop}`}>
      <h1 className="text-6xl py-2  px-2 md:px-0 font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">venturo</h1>
      <div className={`flex h-auto items-center flex-row-reverse ${userInfoDirection} gap-3`}>
        <div className={`flex py-2 md:py-0 px-2 md:px-0 flex-col ${isMobileCentered || isDesktopCentered ? "items-center" : ""} ${textAlign}`}>
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