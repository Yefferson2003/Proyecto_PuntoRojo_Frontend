import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export function formatCurrencyCOP(amount: number) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0, // No decimales
        maximumFractionDigits: 0  // No decimales
    }).format(amount);
}
export const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);

    const formatterDate = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const formatterTime = new Intl.DateTimeFormat('es-ES', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    });

    const formattedDate = formatterDate.format(date); // Formatea solo la fecha
    const formattedTime = formatterTime.format(date); // Formatea solo la hora

    return `${formattedDate} ${formattedTime}`;
};

export const formatDateTimeLarge = (dateString: string): string => {
    const date = new Date(dateString);

    const formatterDate = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'short', // Mes abreviado
        day: 'numeric',
    });

    const formatterTime = new Intl.DateTimeFormat('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const formattedDate = formatterDate.format(date); // Formatea solo la fecha
    const formattedTime = formatterTime.format(date); // Formatea solo la hora

    return `${formattedDate}, ${formattedTime}`;
};

export const deliveryPrice = 3000

export const labelsReview: { [index: number]: string } = {
    0: 'No hay Reseña',
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

export function getMonthName(dateRange: string): string {

    const [startDate, endDate] = dateRange.split(" - ");

    const date = dayjs(startDate);


    if (!date.isValid()) {
        throw new Error("Fecha inválida, asegúrate de pasar un rango válido de fechas");
    }

    const monthName = date.locale('es').format('MMMM');

    return monthName;
}

export function formatDayAbbreviated(dateString: string): string {
    
    const date = dayjs(dateString);

    
    if (!date.isValid()) {
        throw new Error("Fecha inválida, espera un formato YYYY-MM-DD");
    }

    
    return date.format("ddd"); 
}

export function formatDateToDayMonth(dateString: string): string {
    
    const date = dayjs(dateString);

    
    if (!date.isValid()) {
        throw new Error("Fecha inválida, espera un formato YYYY-MM-DD");
    }

    
    return date.locale('es').format('D MMM');
}