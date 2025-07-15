import { useSelector } from "react-redux";
import { light, dark } from "../Styles/Colors";

const useThemeColors = () => {
    const  isDarkMode  = useSelector((state: any) => state.Theme.isDarkMode);
    return isDarkMode ? dark : light
};

export default useThemeColors;