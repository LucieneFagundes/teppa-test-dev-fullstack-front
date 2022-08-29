import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

interface Props {
  data: any;
  columns: any;
  // photo?: boolean;
  handleEdit: (data: any) => void;
  handleDelete: (data: any) => void;
}

export default function Table({
  data,
  columns,
  handleEdit,
  handleDelete,
}: Props) {
  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-text p-button-rounded p-button-secondary mr-2"
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-text  p-button-rounded p-button-danger"
          onClick={() => handleDelete(rowData)}
        />
      </React.Fragment>
    );
  };
  const dynamicColumns = columns.map((col: any, i: any) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  return (
    <div className="h-auto">
      <div className="card">
        <DataTable value={data} responsiveLayout="scroll" scrollable scrollHeight="400px">
          {dynamicColumns}
          <Column
            body={actionBodyTemplate}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
