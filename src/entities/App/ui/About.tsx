import {useNavigate} from "react-router";
import {Button} from "@mui/material";

const About = () => {
    const navigate = useNavigate();


    return (
        <>
            <Button variant={'contained'} onClick={()=> navigate("-1",{state:{isAboutPage:true}})} > Go back</Button>
            <h1 >ABOUT</h1>
            <h1 >ABOUT</h1>
            <h1 >ABOUT</h1>
        </>
    );
};

export default About;