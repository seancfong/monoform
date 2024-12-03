"use client";

import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MultipleChoiceResponseBlock } from "@/lib/types/responses";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  responses: {
    label: "Responses",
    color: "hsl(var(--chart-1))",
  },
  max: {
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Props = {
  block: MultipleChoiceResponseBlock;
};

export default function ResponseBlockMultipleChoice({ block }: Props) {
  const chartData = useMemo(() => {
    return block.multipleChoiceOptions.map((option) => ({
      option: option.text,
      responses: option.multipleChoiceBlockResponses.length,
    }));
  }, []);

  return (
    <div className="space-y-4">
      <PreviewBlockHeader block={block} />
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
            right: 24,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="option"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <YAxis
            type="number"
            domain={[0, "dataMax"]}
            allowDecimals={false}
            axisLine={false}
            width={24}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="responses"
            fill="var(--color-responses)"
            radius={4}
            maxBarSize={48}
            activeIndex={-1}
            activeBar={({ ...props }) => {
              return (
                <Rectangle
                  {...props}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              );
            }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
