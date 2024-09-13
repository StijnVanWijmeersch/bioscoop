import { NavLink, useNavigate } from "react-router-dom"
import useLoginCheck from "../hooks/useLoginCheck";
import { logout } from "../api";
import { Toaster } from "react-hot-toast";
import useToast from "../hooks/useToast";
import StyledButton from "./StyledButton";

const Navbar = () => {

  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useLoginCheck();
  const { notifyFailure,  notifySuccess } = useToast();

  const handleLogoClick = () => {
    navigate('/');
  }

  const handleLogout = async () => {
      try {
        const response = await logout();
        const { status } = response;


        console.log(response);

        if(status === 204) {
          setIsLoggedIn(false);
          notifySuccess("Logout successfull");
        }
      } catch(err) {
        notifyFailure(err.response.data)
      }
  }

  return (
    <div className="w-full h-20 bg-gray-100">
      <Toaster />
      <nav className="w-full h-full px-16 py-2 flex items-center justify-between">
        <div className="h-full w-48 cursor-pointer" onClick={handleLogoClick}>
          <img className="w-full h-full object-cover" src="/src/assets/web3.png" alt="logo" />
        </div> 
        {
          isLoggedIn 
          ? 
          <div className="h-full flex items-center gap-x-6">
            <StyledButton onClick={handleLogout}>Logout</StyledButton>
            <NavLink to={'/user/tickets'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </NavLink>
          </div>
          : <NavLink className="font-semibold text-lg tracking-wide text-gray-600 hover:text-gray-900" to={'/auth'}>Login or Register</NavLink>       

        }
      </nav>
    </div>
  )
}

export default Navbar