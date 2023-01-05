import React, { useEffect, useState } from "react";
import "./Nav.css";

export default function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
        console.log(window.scrollY);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.addEventListener("scroll", () => {});
    };
  }, []);

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="Netflix logo"
        src="https://w.namu.la/s/984a3a524c3a76ef69967a3538f0b655d9e4a9b948314bd8d57f34a1502753104f1613f356c08d4352cdfad86bbea9cd56b2133ea5c9c7a57f1c065b1048cb5bf606e29e4d8af5980ecc7fa3a2f9a6e827c41ac279f8f191622d6130e4c6fc98"
        className="nav__logo"
        onClick={() => window.location.reload()}
      />
      <img alt="User logged" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" className="nav__avatar" />
    </nav>
  );
}
