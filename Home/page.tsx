import Image from "next/image";
import humanBody from "@/assets/human-body.png";

import { HomePageResponse } from "@/types/home";
import { CHART_COLORS } from "@/config/constant";
import { fetcher } from "@/lib/api/fetcher";
import { formatNumber } from "@/lib/utils";
import {
  homePageResponseSchema,
  mapStatisticSchema,
  statisticTableSchema,
  totalStatisticsSchema,
} from "@/lib/validation/home";
import ErrorMessageBox from "@/components/invalid-data-error";
import SectionContainer from "@/components/section-container";
import StatsCard from "@/components/stats-card";

import BriefTable from "./brief-table";
import HBarChart from "./h-bar-chart";
import Slide from "./slide";
import VBarChart from "./v-bar-chart";

export default async function HomePage() {
  // Home에 필요한 데이들을 가져옴
  const data = await fetcher<HomePageResponse>(`/statistic-info`);

  // 가져온 데이터들이 유효한지 확인
  const isTotalStatisticsValid = totalStatisticsSchema.safeParse(
    data.total_statistics
  ).success;

  const isMapStatisticsValid = mapStatisticSchema.safeParse(
    data.MAP_statistics
  ).success;

  const isStatisticTableValid = statisticTableSchema.safeParse(
    data.statistic_table
  ).success;

  if (
    !isTotalStatisticsValid ||
    !isMapStatisticsValid ||
    !isStatisticTableValid
  ) {
    console.error(JSON.stringify(homePageResponseSchema.safeParse(data).error));
  }

  return (
    <div className="my-2">
      <h1 className="mb-6 text-center">IMMUNO RESOURCE</h1>
      <div className="space-y-6">
        <SectionContainer className="space-y-6">
          <h4 className="text-center text-[16px] tracking-[0.5em]">
            HLA CLASS I
          </h4>
          <div className="flex gap-4">
            {!isTotalStatisticsValid ? (
              <ErrorMessageBox />
            ) : (
              <>
                <StatsCard
                  label="Samples"
                  value={formatNumber(data.total_statistics.total_samples)}
                />
                <StatsCard
                  label="Sample Types"
                  value={formatNumber(data.total_statistics.total_tissues)}
                />
                <StatsCard
                  label="Cancer Types"
                  value={formatNumber(data.total_statistics.total_cancer_types)}
                />
                <StatsCard
                  label="Canonical Peptides"
                  value={formatNumber(data.total_statistics.total_MAP_c)}
                />
                <StatsCard
                  label="Noncanonical Peptides"
                  value={formatNumber(data.total_statistics.total_MAP_nc)}
                />
              </>
            )}
          </div>
        </SectionContainer>
        <SectionContainer title="Introduction" className="space-y-6">
          <div className="flex justify-between">
            <div className="w-1/2 flex-1 space-y-4 text-gray-600">
              <p className="font-semibold text-gray-900">
                Immunoresource : Noncanonical MHC-I associated peptide database
                compounded by proteogenomic analysis of immunopeptidome data
              </p>
              <p>
                ImmunoResource, a database of ncMAPs identified by a novel
                proteogenomic method called pXg(
                <a
                  href="https://github.com/HanyangBISLab/pXg"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  https://github.com/HanyangBISLab/pXg
                </a>
                ), facilitating discovery of a broader range of ncMAPs.
                ImmunoResource provides extensive genomic annotations, including
                the RNA read coverage, serving as a valuable and practical
                resource for immunotherapy development.
              </p>
              <p>
                We collected hundreds of raw files from various public
                resources, along with their HLA types. Since our method requires
                paired MHC-I immunopeptidome and RNA-seq data, a select sample
                pool was advanced to analysis.
              </p>
              <p>
                As a result, We successfully identified hundreds of thousands of
                canonical MAPs (cMAPs) and unearthed thousands of ncMAPs. We
                provide all these peptides for use in immunotherapy research
              </p>
            </div>
            <div className="w-1/2 flex-1">
              <Slide />
            </div>
          </div>
        </SectionContainer>
        <SectionContainer title="Reference" className="space-y-6">
          <div className="flex justify-between">
            <div className="w-1/2 flex-1 space-y-4 text-gray-600">
              <p>
              Choi S, Paek E. pXg: Comprehensive Identification of Noncanonical MHC-I-Associated Peptides From De Novo Peptide Sequencing Using RNA-Seq Reads. 
              Mol Cell Proteomics. 2024 Apr;23(4):100743. <a href = "https://doi.org/10.1016/j.mcpro.2024.100743" target="_blank"> doi.org/10.1016/j.mcpro.2024.100743.</a>
              Epub 2024 Feb 23. PMID: 38403075; PMCID: PMC10979277.
              </p>
            </div>
          </div>
        </SectionContainer>
        <SectionContainer title="Statistics" className="space-y-6">
          <div className="flex gap-6 ">
            <div className="flex flex-1 gap-6">
              <div className="grid h-full flex-1 place-content-center">
                <Image src={humanBody} alt="Human Body" width={400} />
              </div>
              <div className="flex">
                {!isMapStatisticsValid ? (
                  <ErrorMessageBox />
                ) : (
                  <>
                    <VBarChart
                      wrapperClassName="max-w-[200px]"
                      data={{
                        labels: data.MAP_statistics.map((d) => d.tissue_name),
                        datasets: [
                          {
                            label: "Sample Count",
                            data: data.MAP_statistics.map(
                              (d) => d.sample_count
                            ),
                            backgroundColor: CHART_COLORS,
                            barPercentage: 0.5,
                          },
                        ],
                      }}
                    />
                    <div className="flex flex-col items-start justify-center gap-2">
                      {data.MAP_statistics.map((d) => d.tissue_name).map(
                        (label, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div
                              className="size-3 rounded-sm"
                              style={{ backgroundColor: CHART_COLORS[index] }}
                            ></div>
                            <span className="text-secondary min-w-[30px] truncate">
                              {label}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="h-hull flex flex-1 flex-col gap-6">
              <div className="">
                <BriefTable data={data.statistic_table} />
              </div>
              <div className="flex flex-1 gap-2">
                {!isMapStatisticsValid ? (
                  <ErrorMessageBox />
                ) : (
                  <>
                    <HBarChart
                      wrapperClassName="flex-1"
                      flip={true}
                      data={{
                        labels: data.MAP_statistics.map((d) => d.tissue_name),
                        datasets: [
                          {
                            label: "Non-Canonical MAPs",
                            data: data.MAP_statistics.map(
                              (d) => d.MAP_count_nc
                            ),
                            backgroundColor: CHART_COLORS,
                            barPercentage: 0.5,
                          },
                        ],
                      }}
                    />
                    <HBarChart
                      wrapperClassName="flex-1"
                      data={{
                        labels: data.MAP_statistics.map((d) => d.tissue_name),
                        datasets: [
                          {
                            label: "Canonical MAPs",
                            data: data.MAP_statistics.map((d) => d.MAP_count_c),
                            backgroundColor: CHART_COLORS,
                            barPercentage: 0.5,
                          },
                        ],
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
