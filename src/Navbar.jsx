import image from "./assets/yu_gi_oh__tcg_logo_by_homoco9_ddyvtrd-pre.png";

export function Navbar() {
  return (
    <div className="navbar">
      <img id="logo-nav" src={image} width="100%" />
      <span id="title">
        Fetch Data WebApp (<span style={{ color: "orange" }}>English Only</span>
        )<p>Developed by Francesco Balleri</p>
      </span>
      <div>
        <label htmlFor="card-select" id="select-tag">
          Card Type
        </label>
        <select id="card-select" disabled>
          <option>Monster</option>
          <option>Spell</option>
          <option>Trap</option>
        </select>
      </div>
    </div>
  );
}
