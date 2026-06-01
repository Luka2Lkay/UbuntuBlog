
interface Props {
    title: string,
    value: number
}

function StatisticsCard({ title, value }: Props) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-lg font-semibold text-gray-800 mt-1">{value}</p>
        </div>
    )
}

export default StatisticsCard