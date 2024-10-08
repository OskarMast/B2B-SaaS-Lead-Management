import React, { useState } from "react";
import Papa from "papaparse";
import { useData } from "../../context/DataContext";

export interface CSVRow {
  [key: string]: string;
}

const leadFields = [
  "LinkedIn UrL",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Gender",
  "Industry",
  // "Title",
  "Job Title",
  "Management  Level",
  "Departments",
  // "Work Phone",
  // "Home Phone",
  // "Mobile Phone",
  // "Other Phone",
  "City",
  "State",
  "Country",
  "Facebook",
  "Twitter",
  // "Past Companies",
  "Last Updated",
];

const companyFields = [
  "Company Linkedin Url",
  "Company Name",
  "Company Website",
  "Phone numbers",
  "Address",
  "Employees",
  // "Retail Location",
  "Industry",
  "Keywords",
  "Facebook",
  "Twitter",
  "City",
  "State",
  "Country",
  "SEO Description",
  // "Technologies",
  // "Annual Revenue",
  // "Total Funding",
  // "Latest Funding",
  // "Latest Funding Amount",
  // "Last Raised At",
];

const Upload = () => {
  const { startUpload } = useData();
  const [csvData, setCSVData] = useState<CSVRow[]>([]);
  const [fieldMappings, setFieldMappings] = useState<{ [key: string]: string }>(
    {}
  );
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Validate file type
      if (file.type !== "text/csv") {
        setError("Invalid file type. Please upload a CSV file.");
        return;
      }

      // Validate file size (e.g., max 5MB)
      // const maxSize = 5 * 1024 * 1024; // 5MB
      // if (file.size > maxSize) {
      //   setError("File is too large. Please upload a file smaller than 5MB.");
      //   return;
      // }

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: any) => {
          // Validate content by checking required fields in the headers
          const requiredHeaders: any[] = [];
          const headers = results.meta.fields || [];
          const missingHeaders = requiredHeaders.filter(
            (header) => !headers.includes(header)
          );

          if (missingHeaders.length > 0) {
            setError(
              `CSV is missing required headers: ${missingHeaders.join(", ")}`
            );
            return;
          }

          setCSVData(results.data as CSVRow[]);
          setCsvHeaders(headers);
        },
      });
    }
  };

  const handleFieldMapping = (csvField: string, databaseField: string) => {
    setFieldMappings((prevMappings) => ({
      ...prevMappings,
      [databaseField]: csvField,
    }));
  };

  const handleConfirm = () => {
    setError("");
    if (csvData.length === 0) {
      setError("Import a valid csv file");
      return;
    }

    const requiredFields: any = [];
    const missingFields = requiredFields.filter(
      (field: string | number) => !fieldMappings[field]
    );

    if (missingFields.length > 0) {
      setError(`Missing required field mappings: ${missingFields.join(", ")}`);
      return;
    }

    // const invalidRows = csvData.filter(
    //   (row) =>
    //     !row[fieldMappings["First Name"]] || !row[fieldMappings["Last Name"]]
    // );

    // if (invalidRows.length > 0) {
    //   setError("CSV contains rows with missing first name or last name");
    //   return;
    // }

    startUpload(csvData, fieldMappings);
  };

  return (
    <div className="container mx-auto p-4 overflow-auto h-full">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Upload CSV</h1>
        <input
          type="file"
          accept=".csv"
          title="csv title"
          onChange={handleFileChange}
          className="mb-4"
        />

        {error && <div className="text-red-500">{error}</div>}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Lead Info:</h2>
          {leadFields.map((field, index) => (
            <div key={index} className="mb-2">
              <label className="block mb-1">{field}:</label>
              <select
                title={`Select ${field}`}
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleFieldMapping(e.target.value, field)}
              >
                <option value="">Select {field}</option>
                {csvHeaders.map((header, idx) => (
                  <option key={idx} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Company Info:</h2>
          {companyFields.map((field, index) => (
            <div key={index} className="mb-2">
              <label className="block mb-1">{field}:</label>
              <select
                title={`Select ${field}`}
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleFieldMapping(e.target.value, field)}
              >
                <option value="">Select {field}</option>
                {csvHeaders.map((header, idx) => (
                  <option key={idx} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Upload;
