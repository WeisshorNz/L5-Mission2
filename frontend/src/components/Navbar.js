import "../styling/navbar.css";
import turnersLogo from "../images/turnersLogo.png";

export default function Navbar() {
  return (
    <nav className="navigation">
      <img src={turnersLogo} alt="TurnersLogo" className="logo" href="/" />

      <div className="navigation-menu">
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
