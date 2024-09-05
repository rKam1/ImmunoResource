import { StatisticTable } from "@/types/home";
import { formatNumber } from "@/lib/utils";

interface Props {
  data?: StatisticTable;
}

// Table in Statistics section
export default function BriefTable({ data }: Props) {
  return (
    <table className="min-w-full table-auto border-separate border-spacing-0 rounded border border-[#F0F0F0] text-xs">
      <thead className=" bg-[rgba(0,0,0,.02)]">
        <tr>
          <th className="w-[28%] rounded-tl border-b border-[#F0F0F0] px-4 py-2 font-semibold">
            Type
          </th>
          <th className="w-[24%] border-b border-[#F0F0F0] px-4 py-2 font-semibold">
            Total
          </th>
          <th className="w-[24%] border-b border-[#F0F0F0] px-4 py-2 font-semibold">
            Binder
          </th>
          <th className="w-[24%] border-b border-[#F0F0F0] px-4 py-2 font-semibold">
            Binder Ratio
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px]">
            Canonical PSMs
          </td>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px] text-end">
            {formatNumber(data?.total_psm_c || 0)}
          </td>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px] text-end">
            {formatNumber(data?.total_psm_binder_c || 0)}
          </td>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px] text-end">
            {formatNumber(
              !data?.total_psm_c || !data.total_psm_binder_c
                ? 0
                : data.total_psm_binder_c / data.total_psm_c,
              0,
              6
            )}
          </td>
        </tr>
        <tr>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px]">
            Non-canonical PSMs
          </td>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px] text-end">
            {formatNumber(data?.total_psm_nc || 0)}
          </td>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px] text-end">
            {formatNumber(data?.total_psm_binder_nc || 0)}
          </td>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px] text-end">
            {formatNumber(
              !data?.total_psm_nc || !data.total_psm_binder_nc
                ? 0
                : data.total_psm_binder_nc / data.total_psm_nc,
              0,
              6
            )}
          </td>
        </tr>
        <tr>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px]">
            Canonical Peptides
          </td>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px] text-end">
            {formatNumber(data?.total_peptide_c || 0)}
          </td>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px] text-end">
            {formatNumber(data?.total_MAP_c || 0)}
          </td>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px] text-end">
            {formatNumber(
              !data?.total_peptide_c || !data.total_MAP_c
                ? 0
                : data.total_MAP_c / data.total_peptide_c,
              0,
              6
            )}
          </td>
        </tr>
        <tr>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px]">
            Non-canonical Peptides
          </td>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px] text-end">
            {formatNumber(data?.total_peptide_nc || 0)}
          </td>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px] text-end">
            {formatNumber(data?.total_MAP_nc || 0)}
          </td>
          <td className="border-b border-[#F0F0F0] px-4 py-[6px] text-end">
            {formatNumber(
              !data?.total_peptide_nc || !data.total_MAP_nc
                ? 0
                : data.total_MAP_nc / data.total_peptide_nc,
              0,
              6
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
