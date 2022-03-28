import React, { useRef, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from "react-router-dom";
import constants from "../../constants";
import Error from "../../commons/components/error";

export default function ActivityList(props) {
	let data = props.activities;

	const table = useRef(null);
	const [numberRows, setNumberRows] = useState(0);
	const history = useNavigate();

	let url = constants.URL_ACTIVITY;

	if (!data) return <div className="table">No activities created.</div>;

	const columns = [
		{
			dataField: "title",
			text: "Name",
		},
		{
			dataField: "_id",
			text: "Topics",
			sort: true,
		},
	];

	const handleNew = (e) => {
		e.preventDefault();
		history("/activity");
	};

	const deleteRows = async () => {
		const rows = table.current.selectionContext.selected;
		console.log(rows);
	};

	const onRowSelect = (row, isSelect, rowIndex, e) => {
		if (isSelect) setNumberRows(numberRows + 1);
		else setNumberRows(numberRows - 1);
	};

	const onRowSelectAll = (isSelect, rows, e) => {
		if (isSelect) setNumberRows(rows.length);
		else setNumberRows(0);
	};

	const selectRow = {
		mode: "checkbox",
		onSelect: onRowSelect,
		onSelectAll: onRowSelectAll,
	};

	const rowEvents = {
		onClick: (e, row, rowIndex) => {
			history("/activity/" + row._id);
		},
		onMouseEnter: (e, row, rowIndex) => {},
	};

	const deleteRow = async () => {
		const res = await fetch(url).catch((error) => {
			 
		});

		if (res) {
			const data = await res.json();
			console.log(data);
			 
		}
		 
	};

	 

	return (
		<div className="table">
			{numberRows > 0 && data.length > 0 && (
				<button
					id="deleter"
					className="btn btn-link float-right"
					type="button"
					onClick={deleteRows}
				>
					Delete
				</button>
			)}

			<BootstrapTable
				striped
				hover
				keyField="_id"
				data={data}
				columns={columns}
				selectRow={selectRow}
				ref={table}
				pagination={paginationFactory()}
				rowEvents={rowEvents}
			/>
		</div>
	);
}
