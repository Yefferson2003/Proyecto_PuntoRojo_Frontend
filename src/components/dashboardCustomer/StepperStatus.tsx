
import { useIsMovile } from '@/hooks/useIsMovile';
import { statusTraslations } from '@/locales/es.';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
            'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
            'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
        ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
        }),
    },
}));

const ColorlibStepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean };
    }>(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
    }),
    variants: [
        {
        props: ({ ownerState }) => ownerState.active,
        style: {
            backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        },
        },
        {
        props: ({ ownerState }) => ownerState.completed,
        style: {
            backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        },
        },
    ],
}));

function ColorlibStepIcon(props: StepIconProps & {deliveryType: string}) {
    const { active, completed, className, deliveryType } = props;

    const icons: { [index: string]: React.ReactElement<unknown> } = {
        1: <VisibilityIcon />,
        2: <HourglassEmptyIcon />,
        3: <InventoryIcon />,
        4: deliveryType === 'delivery' ? <LocalShippingIcon /> : <StorefrontIcon />,
        5: <CheckCircleIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const stepsDelivery = ['inReview', 'pending', 'packaging', 'sending', 'completed'];
const stepsPickup = ['inReview', 'pending', 'packaging', 'ready', 'completed'];

type StepperStatusProps = {
    status: string
    deliveryType: string
}

export default function StepperStatus({status, deliveryType} : StepperStatusProps) {

    const isMovil = useIsMovile()
    const [expanded, setExpanded] = React.useState(isMovil ? true : false);

    const handleChange = (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <p className='w-full mx-auto'>Estado - <span className='text-principal'> {statusTraslations[status]}</span></p>
            </AccordionSummary>
            <AccordionDetails>
            <Stack sx={{ 
                width: '100%', 
                alignItems: { xs: 'center', sm: 'normal' },
                justifyContent: { xs: 'center', sm: 'normal' },
                }}  
                spacing={4}
            >
                <Stepper 
                    alternativeLabel 
                    orientation={ isMovil ? 'horizontal' : 'vertical'}
                    activeStep={
                        deliveryType == 'delivery' ? 
                        stepsDelivery.indexOf(status) :
                        stepsPickup.indexOf(status)
                    } 
                    connector={isMovil ? <ColorlibConnector /> : null} 
                >
                    {deliveryType == 'delivery' ? (
                        stepsDelivery.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={(props) => <ColorlibStepIcon {...props} deliveryType={deliveryType}/>}>{statusTraslations[label]}</StepLabel>
                            </Step>
                        ))
                    ):(
                        stepsPickup.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={(props) => <ColorlibStepIcon {...props} deliveryType={deliveryType}/>}>{statusTraslations[label]}</StepLabel>
                            </Step>
                        ))
                    )}
                </Stepper>
            </Stack>
            </AccordionDetails>
        </Accordion>
        

    )
}
