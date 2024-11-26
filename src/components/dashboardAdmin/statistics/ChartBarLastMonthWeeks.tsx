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
import { getDataForChart } from "@/api/OrderApi"
import Loader from "@/components/Loader"
import { getMonthName } from "@/utils/index"

const chartConfig = {
    count: {
        label: "Domicilios completados -",
        color: "#ff0000",
    },

} satisfies ChartConfig

export function ChartBarLastMonthWeeks() {

    const {data, isLoading} = useQuery({
        queryKey: ['lastMonthWeeks'],
        queryFn: () => getDataForChart({lastMonthWeeks: 'true'})
    })
    
    if (isLoading) return <Loader/>
    if (data) return (
        <Card style={{width: 450}}>
        <CardHeader>
            <CardTitle>Cantida de Pedidos Completados</CardTitle>
            <CardDescription>Ultimo mes - <span className="capitalize text-principal">{getMonthName(data[0].date)}</span></CardDescription>
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
                    tickFormatter={(_, index) => `Sem ${index + 1}`}
                />
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="count" fill="#ff0000" radius={4} />
            </BarChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
            Domicilios completados el ultimo mes 
            <p className="text-principal">{data.reduce((sum, item )=> sum + item.count, 0)}</p>
            <TrendingUp className="w-4 h-4" />
            </div>
        </CardFooter>
        </Card>
    )
}
