import React, { useState } from "react";

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [csSubjects, setCsSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  // async function getPdfText(file) {
  //   const pdf = await pdfjsLib.getDocument(file).promise;
  //   let text = "";

  //   for (let i = 1; i <= pdf.numPages; i++) {
  //     const page = await pdf.getPage(i);
  //     const pageText = await page.getTextContent();
  //     text += pageText.items.map((item) => item.str).join(" ");
  //   }

  //   return text;
  // }

  const processPDF = async () => {
    if (!pdfFile) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", pdfFile);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3002/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResult(data);
      } else {
        setResult("Error uploading PDF.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Error uploading PDF.");
    } finally {
      setLoading(false);
    }
  };

  const getTotalEarnedGPA = () => {
    if (!result) return 0;

    return result.reduce((total, data) => {
      const credits = Math.floor(data?.gpa);
      return total + (credits !== undefined ? credits : 0);
    }, 0);
  };

  const getTotalGpa = () => {
    if (!result) return 0;

    return result.reduce((total, data) => {
      const credits = Math.floor(data?.gpa);
      return (
        total + (credits !== undefined ? credits * getGradePoint(data?.grd) : 0)
      );
    }, 0);
  };

  return (
    <div className="main-box">
      <header className="nav-bg">
        <nav>
          <h3 className="logo-name">GPA Calculator</h3>
          <div className="cta-btn">
            <button className="btn">Upload file</button>
          </div>
        </nav>
      </header>
      <main className="main-box-middle">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="btn"
        />
        <button onClick={processPDF} disabled={loading} className="btn">
          {loading ? "Loading..." : "Process PDF"}
        </button>

        {result && (
          <div className="result-box">
            <table>
              <tr>
                <th>Subject</th>
                <th>Earn</th>
                <th>Grd</th>
                <th>Total GPA</th>
              </tr>
              {result?.map((data, i) => (
                <tr key={i}>
                  <td>{data?.subject}</td>
                  <td>{data?.gpa}</td>
                  <td>{data?.grd}</td>
                  {/* <td>
                    {data?.gpa} x{" "}
                    {data?.grd === "A"
                      ? 3.75
                      : data?.grd === "A-"
                      ? 3.5
                      : data?.grd === "B+"
                      ? 3.3
                      : data?.grd === "B"
                      ? 3.0
                      : data?.grd === "B-"
                      ? 2.7
                      : data?.grd === "C+"
                      ? 2.3
                      : data?.grd === "C"
                      ? 2.0
                      : data?.grd === "C-"
                      ? 1.7
                      : data?.grd === "D+"
                      ? 1.3
                      : data?.grd === "D"
                      ? 1.0
                      : 0}
                  </td> */}
                  <td>
                    {data?.gpa !== undefined && data?.grd
                      ? `${data?.gpa} x ${getGradePoint(data?.grd)}`
                      : "N/A"}
                    ={(data?.gpa * getGradePoint(data?.grd)).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td> Total Credits: {getTotalEarnedGPA()}</td>
                <td></td>
                <td> Total GPA: {getTotalGpa().toFixed(2)}</td>
              </tr>
            </table>
            <p
              style={{
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Calculated GPA : {getTotalGpa().toFixed(2)} /{" "}
              {getTotalEarnedGPA()} =
              {(getTotalGpa() / getTotalEarnedGPA()).toFixed(2)}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

function getGradePoint(grade) {
  switch (grade) {
    case "A":
      return 3.75;
    case "A-":
      return 3.5;
    case "B+":
      return 3.3;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.3;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.3;
    case "D":
      return 1.0;
    default:
      return 0;
  }
}