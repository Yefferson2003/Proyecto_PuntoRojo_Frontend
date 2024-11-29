import CircularProgress from '@mui/material/CircularProgress';

export default function LoaderView() {
    return (
        <main className="flex items-center justify-center h-screen">
            <CircularProgress color='error' size={120} />
        </main>
    );
}