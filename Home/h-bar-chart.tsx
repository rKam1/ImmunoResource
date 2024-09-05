"use client";

import { useMemo } from "react";
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
  flip?: boolean;
}

// Non-Canonical MAPs and Canonical MAPs chart
export default function HBarChart({
  data,
  wrapperClassName,
  flip = false,
}: Props) {
  const router = useRouter();

  const options: ChartOptions<"bar"> = useMemo(() => {
    return {
      onClick(event, elements, chart) {
        if (elements.length > 0) {
          const elementIndex = elements[0].index;
          const tissue = data.labels?.[elementIndex];

          let peptideType =
            data.datasets?.[0].label === "Non-Canonical MAPs"
              ? "Non-canonical"
              : "Canonical";

          router.push(
            `/search?peptide_type=${peptideType}&tissue_type_list=${tissue}`
          );
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
      indexAxis: "y" as const,
      // elements: {
      //   bar: {
      //     borderWidth: 2,
      //   },
      // },
      responsive: true,
      maintainAspectRatio: false,
      // aspectRatio: 3,
      scales: {
        x: {
          // display: false,
          reverse: flip,
          ticks: {
            maxTicksLimit: 5,
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
          // stepSize: 1, // Sets a fixed interval for y-axis grid lines
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: data.datasets?.[0].label,
          font: {
            size: 14,
          },
        },
      },
    };
  }, [flip, data.datasets]);

  return (
    <div className={wrapperClassName}>
      <Bar options={options} data={data} />
    </div>
  );
}
