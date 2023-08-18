import style from "./BlogPage.module.scss";
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';

export const BlogPage = () => {
    return (
        <main className={style.Blog}>
            <div> <span>This page is currently under construction.</span> <ConstructionOutlinedIcon fontSize='large' color='color_accent_1'/></div>
        </main>

    )
}