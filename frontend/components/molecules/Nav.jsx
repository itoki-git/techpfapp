const Nav = (props) => {
  const { menus } = props;
  console.log(menus);
  return (
    <ul className="nav">
      {menus.map((menu, i) => (
        <li className="nav-menu" key={i}>
          {menu.displayName}
        </li>
      ))}
      <style jsx>
        {`
          .nav {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }
          .nav-menu {
            display: flex;
            flex-direction: column;
            padding: 10px 0;
            font-weight: 700;
            text-align: center;
            color: #053e62;
            font-size: 13px;
          }
        `}
      </style>
    </ul>
  );
};
export default Nav;
