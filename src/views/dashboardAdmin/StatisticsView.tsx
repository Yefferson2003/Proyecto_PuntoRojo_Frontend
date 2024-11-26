import { ChartBarLastMonthWeeks } from "@/components/dashboardAdmin/statistics/ChartBarLastMonthWeeks";
import { ChartBarLast7Days } from "@/components/dashboardAdmin/statistics/ChartBarLast7Days";
import { ChartBarLast7DaysDetails } from "@/components/dashboardAdmin/statistics/ChartBarLast7DaysDetails";
import { ChartBarLastMonthWeeksDetails } from "@/components/dashboardAdmin/statistics/ChartBarLastMonthWeeksDetails";

function StatisticsView() {


    return (
        <div className="">
            <div className="flex flex-wrap gap-5 mt-10">
                <ChartBarLastMonthWeeks/>
                <ChartBarLast7Days/>
            </div>
            <div className="flex flex-wrap gap-5 mt-10">
                <ChartBarLastMonthWeeksDetails/>
                <ChartBarLast7DaysDetails/>
            </div>
        </div>
    )
}

export default StatisticsView