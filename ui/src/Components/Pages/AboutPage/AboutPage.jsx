import style from "./AboutPage.module.scss";
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';


export const AboutPage = () => {
    return (
        <main className={style.About}>
            <div> <span>This page is currently under construction.</span> <ConstructionOutlinedIcon fontSize='large' color='color_accent_1'/></div>
        </main>

    )
}