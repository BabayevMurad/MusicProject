import { Link, useNavigate } from "react-router-dom";
import { FaMusic, FaHeart, FaListUl, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
 
function Sidebar() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "Qonaq";
 
    const sidebarItems = [
        { label: "Music", path: "/musicapp", icon: <FaMusic className="w-5 h-5" /> },
        { label: "PlayList", path: "/playlist", icon: <FaListUl className="w-5 h-5" /> },
        { label: "Favorites", path: "/favorites", icon: <FaHeart className="w-5 h-5" /> },
    ];
 
    const handleLogout = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/");
    };
 
    return (
<>
<button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
>
<span className="sr-only">Open sidebar</span>
<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
<path clipRule="evenodd" fillRule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
</svg>
</button>
 
            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
>
<div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-gray-800 flex flex-col justify-between">
<div>
<ul className="space-y-2 font-medium">
                            {sidebarItems.map((item, i) => (
<li key={i}>
<Link
                                        to={item.path}
                                        className="flex items-center gap-3 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
>
<span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                                            {item.icon}
</span>
<span className="ms-1">{item.label}</span>
</Link>
</li>
                            ))}
</ul>
</div>
 
                    <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
<div className="flex items-center gap-2 px-2 mb-2 text-gray-700 dark:text-gray-300">
<FaUserCircle className="w-5 h-5" />
<span>{username}</span>
</div>
 
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-2 py-1 w-full text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded"
>
<FaSignOutAlt className="w-5 h-5" />
<span>Çıxış</span>
</button>
</div>
</div>
</aside>
</>
    );
}
 
export default Sidebar;