import { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';

import './DealerProductTable.css';

import DealerGlobalFilter from '../DealerGlobalFilter/DealerGlobalFilter';
import DealerColumnFilter from '../DealerColumnFilter/DealerColumnFilter';
import DealerPagination from '../DealerPagination/DealerPagination';

import { productArr } from '../../../utils/constants';

const COLUMNS = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Название товара',
    accessor: 'product_name',
  },
  {
    Header: 'Цена (руб.)',
    accessor: 'price',
  },
  {
    Header: 'Продавец',
    accessor: 'dealer_id',
  },
  {
    Header: "Дата записи",
    accessor: 'date',
  },
  {
    Header: "Статус",
    accessor: 'state',
  },
]

function DealerProductTable() {

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => productArr, []);
  const defaultColumn = useMemo(() => {
    return {
      Filter: DealerColumnFilter
    }
  }, []);

  const tableInstance = useTable({
    columns: columns,
    data: data,
    defaultColumn: defaultColumn,
  }, useFilters, useGlobalFilter, useSortBy, usePagination)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <DealerGlobalFilter filterValue={globalFilter} setFilterValue={setGlobalFilter} />
      <table className='dealer-table' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className='dealer-table__row' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className='dealer-table__header-cell' {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()} className='dealer-table__sort-title'>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                    </span>
                  </div>
                  <div>
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map((cell) => {
                    return <td className='dealer-table__cell' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })
                }
              </tr>
            )
          })}
        </tbody>
      </table>
      <DealerPagination
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        gotoPage={gotoPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        nextPage={nextPage}
        previousPage={previousPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
      />
    </>
  )
};

export default DealerProductTable;
