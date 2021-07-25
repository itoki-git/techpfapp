import Link from "next/link";
import Button from "../atoms/Button";

// ナビメニュー
const Nav = (props) => {
  const { menus } = props;
  console.log(menus);
  return (
    <ul className="nav">
      {menus.map((menu, i) => (
        <li className="nav-menu" key={i}>
          <Link href={menu.to}>
            <a>{menu.displayName}</a>
          </Link>
        </li>
      ))}
      <style jsx>
        {`
          .nav {
            list-style: none;
            display: flex;
          }
          .nav-menu {
            text-align: center;
            margin-right: 0.1rem;
          }
          .nav-menu a {
            text-decoration: none;
            color: #333;
            font-weight: bold;
            padding: 2rem;
          }
        `}
      </style>
    </ul>
  );
};
export default Nav;
