"use client";

import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line
} from "recharts";

// Define la interfaz para los datos individuales
interface DataItem {
    date: string;
    revenue: number;
}

// Define la interfaz para los props del componente
interface iAppProps {
    data: DataItem[];
}

// Función para agregar los datos
const aggregateData = (data: DataItem[]): { date: string; revenue: number }[] => {
    const aggregated = data.reduce((acc: Record<string, number>, curr: DataItem) => {
        if (acc[curr.date]) {
            acc[curr.date] += curr.revenue;
        } else {
            acc[curr.date] = curr.revenue;
        }
        return acc;
    }, {}); // Acc es un objeto donde la clave es una fecha (string) y el valor es el revenue agregado (number).

    // Convertir el objeto en un arreglo con la estructura necesaria
    return Object.keys(aggregated).map((date) => ({
        date,
        revenue: aggregated[date],
    }));
};

// Componente Chart
export default function Chart({ data }: iAppProps) {
    // Procesar los datos agregados
    const processedData = aggregateData(data);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    stroke="#3b82f6"
                    activeDot={{ r: 8 }}
                    dataKey="revenue"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
