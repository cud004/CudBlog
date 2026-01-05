import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import blogService from "../services/blogService";
import authService from "../services/authService";

const AppContext = createContext();

export const AppProvider = ({children}) =>{
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");

    // Fetch all blogs
    const fetchBlogs = async (page = 1, limit = 10, filters = {}) => {
        try {
            setLoading(true);
            const response = await blogService.getAllBlogs(page, limit, filters);
            if (response.success) {
                setBlogs(response.data.blogs || response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    // Fetch user profile
    const fetchUserProfile = async () => {
        try {
            const response = await authService.getProfile();
            if (response.success) {
                setUser(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            // Don't show error toast here as it might happen on page load
        }
    }

    // Login handler
    const handleLogin = async (email, password) => {
        try {
            console.log('🔐 Starting login...', { email });
            const response = await authService.login(email, password);
            console.log('📥 Login response:', response);
            
            if (response.success) {
                console.log('✅ Login successful, setting token...');
                setToken(response.token);
                setUser(response.user);
                localStorage.setItem('token', response.token); // Lưu token vào localStorage
                toast.success('Đăng nhập thành công!');
                return true;
            } else {
                console.log('❌ Login failed:', response.message);
                toast.error(response.message || 'Đăng nhập thất bại');
                return false;
            }
        } catch (error) {
            console.error('💥 Login error:', error);
            console.error('Error response:', error.response?.data);
            toast.error(error.response?.data?.message || error.message);
            return false;
        }
    }

    // Logout handler
    const handleLogout = async () => {
        try {
            await authService.logout();
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
            toast.success('Đăng xuất thành công!');
            navigate('/admin/login');
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    // Initialize app
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            fetchUserProfile();
        }
        fetchBlogs();
    }, [])

    const value = {
        // State
        token,
        setToken,
        user,
        setUser,
        blogs,
        setBlogs,
        categories,
        setCategories,
        tags,
        setTags,
        loading,
        setLoading,
        input,
        setInput,
        
        // Methods
        navigate,
        fetchBlogs,
        fetchUserProfile,
        handleLogin,
        handleLogout,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    return useContext(AppContext);
};
