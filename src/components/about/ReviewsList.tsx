import { ReviewVisible } from "@/types/index";
import { labelsReview } from "@/utils/index";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Pagination, Rating, styled } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';


const CustomAccordionSummary = styled(AccordionSummary)(() => ({
    display: "flex",
    flexDirection: "column",
}));

type ReviewsListProps = {
    reviews: ReviewVisible[]
    count: number
    page: number
    handlePageChange: (event: unknown, newPage: number) => void
}

function ReviewsList({reviews, count, page, handlePageChange} : ReviewsListProps) {
    return (
        <section className="flex flex-wrap justify-around gap-5">
            {reviews.map(review => (
                <div  key={review.id} 
                    className="w-full sm:w-[300px]"
                >
                <Accordion>
                    <CustomAccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >  
                    <div>
                        <Rating name="read-only" value={review.qualification} readOnly />
                        <p className="text-lg font-bold uppercase">
                            {labelsReview[review.qualification]}
                        </p>
                    </div>
                    
                    </CustomAccordionSummary>
                    <AccordionDetails>
                        <p
                            className="text-sm text-justify text-wrap"
                        >{review.description ? review.description :'No hay Descripción'}</p>
                    </AccordionDetails>
                </Accordion>
                </div>
            ))}
            <Pagination
                onChange={handlePageChange}
                page={page}
                count={count}
                sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', flexBasis: '100%' }}
            />
        </section>
    )
}

export default ReviewsList