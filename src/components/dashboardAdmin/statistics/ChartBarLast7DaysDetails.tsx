"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { getDataDetailsForChart } from "@/api/OrderApi"
import Loader from "@/components/Loader"
import { formatCurrencyCOP, formatDateToDayMonth, formatDayAbbreviated } from "@/utils/index"

const chartConfig = {
    total: {
        label: "Total -",
        color: "#ff0000",
    },

} satisfies ChartConfig

export function ChartBarLast7DaysDetails() {

    const {data, isLoading} = useQuery({
        queryKey: ['last7DaysDetails'],
        queryFn: () => getDataDetailsForChart({last7Days: 'true'})
    })
    
    if (isLoading) return <Loader/>
    if (data) return (
        <Card style={{width: 450}}>
        <CardHeader>
            <CardTitle>Cantida Total de los Pedidos Completados</CardTitle>
            <CardDescription>Ultima semana <span className="text-principal">{formatDateToDayMonth(data[0].date)}</span> - <span className="text-principal">{formatDateToDayMonth(data[6].date)}</span></CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => formatDayAbbreviated(value)}
                />
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="total" fill="#ff0000" radius={4} />
            </BarChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
            Total de los domicilios completados en la ultima semana
            <p className="text-principal">{formatCurrencyCOP(data.reduce((sum, item )=> sum + item.total, 0))}</p>
            <TrendingUp className="w-4 h-4" />
            </div>
        </CardFooter>
        </Card>
    )
}
