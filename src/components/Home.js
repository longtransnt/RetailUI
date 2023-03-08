import { useNavigate, NavLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <NavLink to="/editor">Go to the Editor page</NavLink>
      <br />
      <NavLink to="/admin">Go to the Admin page</NavLink>
      <br />
      <NavLink to="/lounge">Go to the Lounge</NavLink>
      <br />
      <NavLink to="/">Go to the NavLink page</NavLink>
      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
