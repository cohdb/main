import React from 'react';
import _ from 'lodash';
import { Table as BootstrapTable } from 'reactstrap';

import Placeholder from '../placeholder/Placeholder';
import { isFulfilled } from '../../utils/statusHelpers';

import './Table.css';

const LoadedBody = ({ records, columns }) => (
  <tbody>
  {
    records.map((record, recordIdx) => (
      <tr key={record.id || recordIdx}>
        {
          columns.map((column, columnIdx) => (
            <td key={columnIdx} style={column.style}>
              {column.cellRenderer && column.cellRenderer({ rowData: record, dataKey: column.dataKey })}
              {!column.cellRenderer && record[column.dataKey]}
            </td>
          ))
        }
      </tr>
    ))
  }
  </tbody>
);

const LoadingBody = ({ columns }) => (
  <tbody>
  {
    _.range(2).map(idx => (
      <tr key={idx}>
        {
          columns.map((column, index) => (
            <td key={index} style={column.style}><Placeholder>{column.label}</Placeholder></td>
          ))
        }
      </tr>
    ))
  }
  </tbody>
);

const Table = ({ records, status, striped = true, hover = false, size = 'sm', className, children }) => (
  <BootstrapTable
    striped={striped}
    hover={hover}
    size={size}
    className={`dbTable ${className}`}
  >
    <thead>
    <tr>
      {
        children.map((child, index) => (
          <th key={index} style={child.style}>{child.label}</th>
        ))
      }
    </tr>
    </thead>
    {isFulfilled(status) && <LoadedBody records={records} columns={children} />}
    {!isFulfilled(status) && <LoadingBody columns={children} />}
  </BootstrapTable>
);

export default Table;
