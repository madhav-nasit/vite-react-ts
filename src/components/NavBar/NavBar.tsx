import "./Style.css";

export const NavBar = () => {
  return (
    <div className="navbar">
      <h3>HTML + CSS + JS</h3>
      <div>
        <a href="#" className="active">
          Home
        </a>
        <a href="https://mindfiredigital.github.io/privacy-policy">Privacy</a>
        <a href="https://mindfiredigital.github.io/terms-of-use">Terms</a>
      </div>
    </div>
  );
};
