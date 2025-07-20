import { useNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = useNavigationContainerRef<any>();

export const navigate = (name: string) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name)
    }
};