import React from "react";
export default function Paginate({ handlePage, totalCount, pageNo }) {
  const left = 3 * pageNo;
  console.log(left, totalCount);
  return (
    <div>
      <button
        onClick={() => handlePage("prev")}
        className="paginateButton prev"
        style={
          pageNo === 1
            ? { marginLeft: 0, background: "gray" }
            : { marginLeft: 0 }
        }
        disabled={pageNo === 1 ? true : false}
      >
        Prev
      </button>
      <button
        onClick={() => handlePage("next")}
        disabled={totalCount - left <= 0 ? true : false}
        className="paginateButton"
        style={totalCount - left <= 0 ? { background: "gray" } : {}}
      >
        Next
      </button>
    </div>
  );
}
