import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@components/ui/calendar";
import { Input } from "app/components/ui/input";
import { Button } from "app/components/ui/button";
import { Card, CardContent } from "app/components/ui/card";
import useApi from "app/hooks/useApi";
import { NextPage } from "next";
import withAdmin from "@components/common/hoc/withAdmin/withAdmin";
import urls from "@config/urls";

interface Title {
  id: number;
  name: string;
}

const ReportsPage: NextPage= () => {
  const { request: fetchTitles } = useApi<null, Title[]>();

  const [titleSearch, setTitleSearch] = useState("");
  const [titles, setTitles] = useState<Title[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<Title | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (titleSearch.length < 3) return;

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(async () => {
      const data = await fetchTitles(`${urls.titlesFilter}?q=${titleSearch}`, "GET");
      setTitles(data);
    }, 300);

    setDebounceTimer(timer);
  }, [titleSearch]);

  const handleDownload = async () => {
    if (!selectedTitle || !startDate || !endDate) return;
    const response = await fetch(`/api/report/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${JSON.parse(localStorage.getItem("auth-storage") || "{}").state?.userSession?.token}`,
      },
      body: JSON.stringify({
        title_id: selectedTitle.id,
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
      }),
    });

    if (!response.ok) return;

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${selectedTitle.name}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-xl p-4">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4 text-center">Download Report</h1>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Search Title..."
                value={titleSearch}
                onChange={(e) => setTitleSearch(e.target.value)}
              />
              {titles.length > 0 && (
                <ul className="border rounded max-h-48 overflow-y-auto mt-2">
                  {titles.map((t) => (
                    <li
                      key={t.id}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-200 ${selectedTitle?.id === t.id ? "bg-gray-300" : ""}`}
                      onClick={() => setSelectedTitle(t)}
                    >
                      {t.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex space-x-4">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} className="flex-1" />
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} className="flex-1" />
            </div>
            <Button
              disabled={!selectedTitle || !startDate || !endDate}
              onClick={handleDownload}
              className="w-full"
            >
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withAdmin(ReportsPage);
