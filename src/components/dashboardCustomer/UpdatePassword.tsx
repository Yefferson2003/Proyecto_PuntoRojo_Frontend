import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useState } from "react";
import ConfirmPasswordForm from "./ConfirmPasswordForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

function UpdatePassword() {

    const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(false)
    
    return (
        <div>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <h2 className="text-xl font-semibold">
                    Cambiar Contraseña
                </h2>
            </AccordionSummary>
            <AccordionDetails>
                {!isConfirmPassword ? 
                    <ConfirmPasswordForm setIsConfirmPassword={setIsConfirmPassword}/> :
                    <UpdatePasswordForm/>
                }
            </AccordionDetails>
        </Accordion>
        </div>
    )
}

export default UpdatePassword