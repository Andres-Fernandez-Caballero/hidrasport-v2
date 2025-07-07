import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@components/ui/calendar";
import { Button } from "app/components/ui/button";
import { Card, CardContent } from "app/components/ui/card";
import { NextPage } from "next";
import withAdmin from "@components/common/hoc/withAdmin/withAdmin";
import urls from "@config/urls";
import useBlob from "app/hooks/useBlob";

const ReportsPage: NextPage = () => {
  const { requestBlob } = useBlob();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleDownload = async () => {
    if (!startDate || !endDate) return;

    const params = new URLSearchParams({
      start_date: format(startDate, "yyyy-MM-dd"),
      end_date: format(endDate, "yyyy-MM-dd"),
    });

    const blob = await requestBlob(`${urls.downloadReport}?${params.toString()}`);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${format(startDate, "yyyyMMdd")}-${format(endDate, "yyyyMMdd")}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-xl p-4">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4 text-center">Descargar reporte</h1>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} className="flex-1" />
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} className="flex-1" />
            </div>
            <Button
              disabled={!startDate || !endDate}
              onClick={handleDownload}
              className="w-full"
            >
              Descargar reporte de inventario
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withAdmin(ReportsPage);
