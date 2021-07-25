import Nav from "../molecules/Nav";
import Image from "next/image";

// ヘッダー
const Header = (props) => {
  const menus = [
    { displayName: "Logout", to: "/logout" },
    { displayName: "Article", to: "/article" },
    { displayName: "Create", to: "/create" },
  ];
  return (
    <div className="header-wrap">
      <div className="logo">
        <Image src="/TriPoon.png" width={200} height={200} />
      </div>
      <Nav menus={menus} />
      <style jsx>
        {`
          .header-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          }
          .logo img {
            display: block;
            max-width: 100%;
          }
        `}
      </style>
    </div>
  );
};
export default Header;
