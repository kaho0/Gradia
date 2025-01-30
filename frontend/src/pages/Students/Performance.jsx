import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Sidebar from "./Sidebar";

const PerformanceSection = () => {
  const [performanceData, setPerformanceData] = useState({
    months: [],
    marks: [],
    totalMarks: 0,
  });

  // Fetch performance data from the backend
  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch("/api/v1/performance"); // Replace with your actual API endpoint
        const data = await response.json();
        setPerformanceData(data);
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    fetchPerformanceData();
  }, []);

  // Line chart data
  const lineChartData = {
    labels: performanceData.months,
    datasets: [
      {
        label: "Performance Trends",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#007bff",
        borderColor: "#007bff",
        data: performanceData.marks,
      },
    ],
  };

  // Inline styles
  const styles = {
    performanceContainer: {
      display: "flex",
      height: "100vh",
      backgroundColor: "#f4f4f4",
    },
    sidebarContainer: {
      width: "250px",
      backgroundColor: "#333",
      color: "#fff",
    },
    content: {
      flex: 1,
      padding: "20px",
    },
    performanceHeader: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    performanceInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    performanceGraphContainer: {
      width: "80%",
      maxWidth: "800px",
      marginBottom: "20px",
    },
    totalMarks: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#007bff",
    },
  };

  return (
    <div style={styles.performanceContainer}>
      <div style={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <div style={styles.content}>
        <h1 style={styles.performanceHeader}>Performance</h1>
        <div style={styles.performanceInfo}>
          <div style={styles.performanceGraphContainer}>
            <Line
              data={lineChartData}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </div>
          <p style={styles.totalMarks}>
            Total Marks: {performanceData.totalMarks}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSection;
