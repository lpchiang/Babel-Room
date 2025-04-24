import navItem from "./nav-item-type";
import { navItems } from "./constants";

const Navigation = () => {
  return (
    <div
      className="w-full flex flex-row border-4 justify-between"
    >
      <img
        src=""
        alt="Logo"
      />
      <nav>
        <ul
          className="flex flex-row gap-4"
        >
          {navItems.map(({key, title, url}: navItem) => (
                  <li
                    className="border-2 border-blue-700 "
                    key={key}
                  >
                      <a href={url.href}>
                          <h1>{title}</h1>
                      </a>
                  </li>
          ))}
        </ul>
      </nav>
    </div>
  )
};

export default Navigation;