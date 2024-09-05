"use client";

import { useRouter } from "next/navigation";
import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: ChartData<"bar", number[], string>;
  wrapperClassName?: string;
}

const truncate = (label: string, maxLength: number): string => {
  if (label.length > maxLength) {
    return label.slice(0, maxLength) + "...";
  }
  return label;
};

// Sample Count chart
export default function VBarChart({ data, wrapperClassName }: Props) {
  const router = useRouter();

  const options: ChartOptions<"bar"> = {
    onClick(event, elements, chart) {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const tissue = data.labels?.[elementIndex];

        router.push(`/search?peptide_type=all&tissue_type_list=${tissue}`);
      }
    },
    onHover: (event, elements, chart) => {
      const nativeEvent = event.native;
      if (nativeEvent) {
        const target = nativeEvent.target as HTMLCanvasElement;
        if (elements.length > 0) {
          target.style.cursor = "pointer";
        } else {
          target.style.cursor = "default";
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    // aspectRatio: 3,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            const label = this.getLabelForValue(value as number);
            return truncate(label, 5);
          },
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Sample Count",
        font: {
          size: 14,
        },
      },
    },
  };

  return (
    <div className={wrapperClassName}>
      <Bar options={options} data={data} />
    </div>
  );
}
