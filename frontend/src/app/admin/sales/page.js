"use client";
import AdminNavBar from "@/components/AdminNavBar";
import Footer from "@/components/Footer"
import OrderTile from "@/components/OrderTile";
import { useEffect, useState } from "react";

export default function SalesPage() {
  const [activeReport, setActiveReport] = useState("Weekly");

  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(0); // Jan=0
  const [selectedYear, setSelectedYear] = useState(2025);

  const [weeklyCompletedReport, setWeeklyCompletedReport] = useState([]);
  const [monthlyCompletedReport, setMonthlyCompletedReport] = useState([]);
  const [yearlyCompletedReport, setYearlyCompletedReport] = useState([]);

  const [totalSales, setTotalSales] = useState(0);
  
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Dropdown options
  const weeklyOptions = [
    "Week 1", "Week 2", "Week 3", "Week 4",
    "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10",
    "Week 11", "Week 12", "Week 13", "Week 14", "Week 15",
    "Week 16", "Week 17", "Week 18", "Week 19", "Week 20",
    "Week 21", "Week 22", "Week 23", "Week 24", "Week 25",
    "Week 26", "Week 27", "Week 28", "Week 29", "Week 30",
    "Week 31", "Week 32", "Week 33", "Week 34", "Week 35",
    "Week 36", "Week 37", "Week 38", "Week 39", "Week 40",
    "Week 41", "Week 42", "Week 43", "Week 44", "Week 45",
    "Week 46", "Week 47", "Week 48", "Week 49", "Week 50",
    "Week 51", "Week 52", "Week 53"
  ];
  const monthlyOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const yearlyOptions = [2023, 2024, 2025];

  // Helper to fetch sales total from backend
  const fetchTotalSales = async () => {
    setLoading(true);
    try {
      let url = "";
      if (activeReport === "Weekly") {
        console.log("weekly report selected, fetching data for week:", selectedWeek-1);
        url = `http://localhost:8080/getWeeklyTotalSales?week=${selectedWeek-1}`;
      } else if (activeReport === "Monthly") {
        console.log("weekly report selected, fetching data for month:", selectedMonth);
        url = `http://localhost:8080/getMonthlyTotalSales?month=${selectedMonth}`;
      } else if (activeReport === "Yearly") {
        console.log("weekly report selected, fetching data for year:", selectedYear);
        url = `http://localhost:8080/getYearlyTotalSales?year=${selectedYear}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (typeof data === "number") {
        setTotalSales(data);
      } else if (data && data.error) {
        console.error("API error:", data.error);
        setTotalSales(0);
      } else {
        setTotalSales(0);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setTotalSales(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch total sales when relevant state changes
  useEffect(() => {
    fetchTotalSales();
  }, [activeReport, selectedWeek, selectedMonth, selectedYear]);

  // Handlers for dropdown selections
  const handleSelectOption = (value) => {
    if (activeReport === "Weekly") {
      const weekNum = parseInt(value.replace("Week ", ""), 10);
      setSelectedWeek(weekNum);
    } else if (activeReport === "Monthly") {
      const monthIndex = monthlyOptions.findIndex((m) => m === value);
      setSelectedMonth(monthIndex);
    } else if (activeReport === "Yearly") {
      setSelectedYear(parseInt(value, 10));
    }
    setShowDropdown(false);
  };

  // Get dropdown options and selected option display text
  const dropdownOptions =
    activeReport === "Weekly"
      ? weeklyOptions
      : activeReport === "Monthly"
      ? monthlyOptions
      : yearlyOptions.map(String);

  const selectedOption =
    activeReport === "Weekly"
      ? `Week ${selectedWeek}`
      : activeReport === "Monthly"
      ? monthlyOptions[selectedMonth]
      : String(selectedYear);

  return (
    <div className="bg-[#ECEDE4] w-full min-h-screen">
      <AdminNavBar />
      <div className="flex flex-col items-center p-10">
        <div className="w-[80vw] flex flex-col gap-4">
          {/* Tabs */}
          <div className="flex justify-between bg-[#D5A52B] rounded-md overflow-hidden">
            {["Weekly", "Monthly", "Yearly"].map((label) => (
              <button
                key={label}
                onClick={() => setActiveReport(label)}
                className={`flex-1 text-center py-3 transition-colors duration-200 text-sm sm:text-base
                  ${
                    activeReport === label
                      ? "text-[#005001] font-bold bg-[#D5A52B]"
                      : "text-white hover:bg-[#005001]"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sales Report + Dropdown */}
          <div className="flex items-center justify-between bg-white p-4 rounded-md shadow">
            <div className="flex items-center gap-4 mx-auto">
              <p className="text-lg font-semibold text-[#005001]">Sales Report:</p>
              <div className="bg-[#D5A52B] rounded-xl px-6 py-3 text-white font-semibold text-lg">
                {loading ? "Loading..." : `₱${totalSales.toFixed(2)}`}
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="bg-[#D5A52B] text-white px-4 py-2 rounded-md shadow hover:bg-[#c49426]"
              >
                {selectedOption}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-1 bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  {dropdownOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleSelectOption(option)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Placeholder for products sold or detailed data */}
          <div className="bg-white rounded-md p-4 h-[70vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-[#005001] mb-4">Products Sold</h2>
            <p className="text-gray-500 italic text-center">
                {activeReport === "Weekly" && (
                    weeklyCompletedReport.length > 0 ? (
                        <div className="flex flex-col gap-6 m-5 h-[70vh] overflow-y-auto">
                            {weeklyCompletedReport.map((item, index) => (
                                <div key={item.id} className="flex flex-col">
                                    <OrderTile item={item} onDelete={fetchItems}/>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-[60vh] text-gray-500">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                                alt="No pending orders"
                                className="w-64 h-64 object-contain mb-4"
                            />
                            <p className="text-lg">No weekly report available.</p>
                        </div>
                    )
                  )}
                  {activeReport === "Monthly" && (
                    monthlyCompletedReport.length > 0 ? (
                        <div className="flex flex-col gap-6 m-5 h-[70vh] overflow-y-auto">
                            {monthlyCompletedReport.map((item, index) => (
                                <div key={item.id} className="flex flex-col">
                                    <OrderTile item={item} onDelete={fetchItems}/>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-[60vh] text-gray-500">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                                alt="No pending orders"
                                className="w-64 h-64 object-contain mb-4"
                            />
                            <p className="text-lg">No monthly report available.</p>
                        </div>
                    )
                  )}
                  {activeReport === "Yearly" && (
                    yearlyCompletedReport.length > 0 ? (
                        <div className="flex flex-col gap-6 m-5 h-[70vh] overflow-y-auto">
                            {yearlyCompletedReport.map((item, index) => (
                                <div key={item.id} className="flex flex-col">
                                    <OrderTile item={item} onDelete={fetchItems}/>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-[60vh] text-gray-500">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                                alt="No pending orders"
                                className="w-64 h-64 object-contain mb-4"
                            />
                            <p className="text-lg">No yearly report available.</p>
                        </div>
                    )
                  )}
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
