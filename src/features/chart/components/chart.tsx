import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTransactions } from "../../../shared/hooks/useTransaction";
import { format } from "date-fns";
import { useFilter } from "@/shared/context/filterContext";

const Chart = () => {
  const { data: transactions = [] } = useTransactions();
  const { appliedFilters: filters } = useFilter();

  //filter transactions based on filters from context
  const filteredTransactions = transactions.filter((t) => {
    const tDate = new Date(t.date);

    const matchesType =
      filters.types.length === 0 ||
      filters.types.includes(t.metadata?.type || t.type);

    const matchesStatus =
      filters.statuses.length === 0 ||
      filters.statuses.includes(t.status.toLowerCase());

    const matchesDate =
      (!filters.startDate || tDate >= filters.startDate) &&
      (!filters.endDate || tDate <= filters.endDate);

    return matchesType && matchesStatus && matchesDate;
  });

  // Get unique sorted dates
  const dates = Array.from(
    new Set(filteredTransactions.map((t) => t.date))
  ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Aggregate deposits and withdrawals by date
  const chartData = dates.map((date) => {
    const deposits = filteredTransactions
      .filter((t) => t.date === date && t.type === "deposit")
      .reduce((sum, t) => sum + t.amount, 0);

    const withdrawals = filteredTransactions
      .filter((t) => t.date === date && t.type === "withdrawal")
      .reduce((sum, t) => sum + t.amount, 0);

    return { date, deposits, withdrawals };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
      >
        {/* X Axis */}
        <XAxis
          dataKey="date"
          axisLine={true}
          tickLine={false}
          interval={0}
          tick={({ x, y, payload, index }) => {
            const isFirst = index === 0;
            const isLast = index === chartData.length - 1;

            if (!isFirst && !isLast) return <g />;

            const label = format(new Date(payload.value), "MMM dd, yyyy");

            return (
              <text
                x={x}
                y={y + 10}
                textAnchor={isFirst ? "start" : isLast ? "end" : "middle"}
                fill="#000"
                fontSize={12}
              >
                {label}
              </text>
            );
          }}
        />

        {/* Y Axis */}
        <YAxis
          // axisLine={false}
          // tick={false}
          // tickLine={false}
          hide={true}
          domain={[0, "dataMax"]}
        />

        {/* Tooltip */}
        <Tooltip />

        {/* Deposit Line */}
        <Line
          type="monotone"
          dataKey="deposits"
          stroke="#FF5403"
          strokeWidth={2}
          dot={false}
        />

        {/* Withdrawal Line */}
        <Line
          type="monotone"
          dataKey="withdrawals"
          stroke="#4F46E5"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
