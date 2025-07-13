// import React, { useState, useEffect } from "react";
// import { statusMap } from "../utils/StatusMap";

// export default function StatusSelector({ initialStatus, onSave }) {
//   const [status, setStatus] = useState(initialStatus);
//   const [dirty, setDirty] = useState(false);

//   useEffect(() => {
//     setDirty(status !== initialStatus);
//   }, [status, initialStatus]);

//   const handleSave = () => {
//     onSave(status);
//   };

//   return (
//     <div className="flex items-center gap-4 flex-wrap">
//       <select
//         value={status}
//         onChange={(e) => setStatus(Number(e.target.value))}
//         className={`px-3 py-2 rounded-md shadow-sm border text-sm focus:outline-none ${statusMap[status]?.select}`}
//       >
//         {Object.entries(statusMap).map(([key, { label }]) => (
//           <option key={key} value={key} disabled={key === "0"}>
//             {label}
//           </option>
//         ))}
//       </select>

      

//       {dirty && (
//         <button
//           onClick={handleSave}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
//         >
//           Save
//         </button>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { statusMap } from "../utils/StatusMap";

export default function StatusSelector({ initialStatus, onSave }) {
  const [status, setStatus] = useState(initialStatus);
  const [dirty, setDirty] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    setDirty(status !== initialStatus || (status === 3 && reason.trim() !== ""));
  }, [status, initialStatus, reason]);

  const handleSave = () => {
    if (status === 3 && reason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }
    const update = {status, reason}
    onSave(update); // Pass both status and reason
    setReason("")
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4 flex-wrap">
        <select
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
          className={`px-3 py-2 rounded-md shadow-sm border text-sm focus:outline-none ${statusMap[status]?.select}`}
        >
          {Object.entries(statusMap).map(([key, { label }]) => (
            <option key={key} value={key} disabled={key === "0"}>
              {label}
            </option>
          ))}
        </select>

        {dirty && (
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Save
          </button>
        )}
      </div>

      {status === 3 && (
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason for rejection"
          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring"
          rows={3}
        />
      )}
    </div>
  );
}
