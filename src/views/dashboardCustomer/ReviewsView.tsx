import { createReview, getReviewByCustomer, updateReview } from "@/api/ReviewApi";
import ReviewDeleteButton from "@/components/dashboardCustomer/ReviewDeleteButton";
import { ReviewForm, ReviewSchema } from "@/types/index";
import { Box, Button, Rating, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const labels: { [index: number]: string } = {
    0.5: 'Muy malo',
    1: 'Malo',
    1.5: 'Aceptable',
    2: 'Regular',
    2.5: 'Pasable',
    3: 'Bueno',
    3.5: 'Muy bueno',
    4: 'Genial',
    4.5: 'Excelente',
    5: 'Perfecto',
};

function ReviewsView() {
    
    const {data} = useQuery({
        queryKey: ['reviewForCustomer'],
        queryFn: getReviewByCustomer,
        refetchOnWindowFocus: false,
        retry: 1
    })
    
    const [value, setValue] = useState<number>(2);
    const [hover, setHover] = useState(-1);
    
    const { register, handleSubmit, reset } = useForm<ReviewForm>({
        defaultValues: {
            qualification: 0,
            description: '',
        }
    });
    
    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: createReview,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data){
            queryClient.invalidateQueries({queryKey: ['reviewForCustomer']})
            toast.success(data)
        }
    })
    
    const {mutate: mutateUpdateReview, isPending: isPendingUpdateReview} = useMutation({
        mutationFn: updateReview,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data){
            queryClient.invalidateQueries({queryKey: ['reviewForCustomer']})
            toast.success(data)
        }
    })
    
    const handleCreateReview = (formData : ReviewForm) => {
        const newFormData = {
            ...formData,
            qualification: value
        }
        if (data && isObjectEmpty(data)) {
            mutate({formData: newFormData})
        }else{
            mutateUpdateReview({formData: newFormData})
        }
    }

    function isObjectEmpty( obj: object) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    useEffect(() => {
        const response = ReviewSchema.safeParse(data)
        if (response.success) {
            setValue(response.data.qualification);
            setHover(-1);
            reset({
                qualification: response.data.qualification,
                description: response.data.description,
            });
        }
    }, [data, reset]);
    
    if (data) return (
        <div className=" w-full lg:mt-48 max-w-[500px] mx-auto bg-white px-5 py-3 mt-20">
            <h2 className="text-xl font-bold text-center text-principal">Mi Reseña</h2>
            {isObjectEmpty(data) && <p className="text-center">No tienes una reseña aun, calificanos...</p>}

            <div className="flex flex-col items-center justify-center gap-1 my-5">
                <Rating
                    name="simple-controlled"
                    size="large"
                    precision={1}
                    value={value} // Convertir value a número
                    onChange={(event, newValue) => {
                        if (newValue !== null) {
                            setValue(newValue);
                        }
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                {value !== null && (
                    <Box sx={{ ml: 2 }}>
                        <p className="text-lg font-bold uppercase">
                        {labels[(hover !== -1 ? hover : value)]}
                        </p>
                    </Box>
                )}
            </div>

            <div>
                <form 
                    onSubmit={handleSubmit(handleCreateReview)}
                    className="space-y-2">

                    <p className="font-bold text-center">Danos tu opinión... (Opcional)</p>
                    
                    <TextField 
                        id="outlined-basic" 
                        fullWidth 
                        color="error"
                        variant="filled" 
                        multiline
                        rows={4}
                        {...register('description')}
                    />

                    {!isObjectEmpty(data) && 
                    <ReviewDeleteButton 
                        reset={reset}
                        setValue={setValue}
                        setHover={setHover}
                    />
                    }
                    
                    <Button
                        type="submit"
                        color="error"
                        variant="contained"
                        fullWidth
                        disabled={isPending || isPendingUpdateReview}
                    >
                        {isObjectEmpty(data) ? 'Guardar Reseña' : 'Editar Reseña'}
                    </Button>
                </form>
            </div>

            
        </div>
    )
}

export default ReviewsView