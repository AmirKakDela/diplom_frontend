import {
    HomeOutlined,
    SearchOutlined,
    ProfileOutlined,
    PlusSquareFilled,
    HeartOutlined
} from "@ant-design/icons";
import {SidebarItemType} from "../../../config/types";

export const items: SidebarItemType[] = [
    {
        path: "/",
        itemId: "home",
        icon: HomeOutlined,
        text: 'Главная',
    },
    {
        path: "/search",
        itemId: "search",
        icon: SearchOutlined,
        text: 'Поиск',
    },
    {
        path: "/my-library",
        itemId: "library",
        icon: ProfileOutlined,
        text: 'Моя медиатека',
    },
    {
        path: "/create-playlist",
        itemId: "create-playlist",
        icon: PlusSquareFilled,
        text: 'Создать плейлист',
    },
    {
        path: "/loved",
        itemId: "favourite-tracks",
        icon: HeartOutlined,
        text: 'Любимые треки',
    }
    ]
