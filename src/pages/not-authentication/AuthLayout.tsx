import { Link, Outlet } from "react-router-dom";
import authImage from "../../assets/task-bg.png";
import logo from "../../assets/task-blue.png";
const AuthLayout = () => {
  return (
    <main className="lg:grid grid-cols-2 w-full h-[100svh] p-[1.2rem] bg-white overflow-hidden">
      <div className="w-full h-full flex flex-col">
        <figure className="w-full lg:px-[2.4rem]">
          <Link to="/">
            <img
              src={logo}
              alt=""
              className="w-full h-[4rem] max-w-[14rem]  object-cover"
            />
          </Link>
        </figure>
        <Outlet />
      </div>
      <figure className="w-full h-full hidden lg:block rounded-[1.2rem] overflow-hidden">
        <img src={authImage} alt="" className="w-full h-full  object-cover" />
      </figure>
    </main>
  );
};

export default AuthLayout;
