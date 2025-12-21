import {Outlet} from 'react-router-dom';
import './MainLayout.less';
import {Navbar} from "../component/common/navbar/Navbar.tsx";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar/>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}
