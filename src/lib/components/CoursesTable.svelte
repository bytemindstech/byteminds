<script lang="ts">
  import { DataHandler } from "@vincjo/datatables";
  import dateFormatter from "@jhenbert/date-formatter";
  import { dateOption, capitalize } from "$lib/util.client";
  import {
    Search,
    RowsPerPage,
    RowCount,
    ThSort,
    ThFilter,
    Pagination,
  } from "./ui";

  interface Props {
    tableData: any;
  }

  let { tableData }: Props = $props();

  const handler = new DataHandler(tableData, { rowsPerPage: 5 });
  const rows = handler.getRows();
</script>

<div class="space-y-2">
  <header class="flex justify-between gap-4">
    <Search {handler} />
    <RowsPerPage {handler} />
  </header>

  <div class="table-container">
    <table class="table table-hover table-compact w-full table-auto">
      <thead>
        <tr>
          <ThSort {handler} orderBy="title">Course Title</ThSort>
          <ThSort {handler} orderBy="price">Price</ThSort>
          <ThSort {handler} orderBy="createdAt">Created On</ThSort>
          <ThSort {handler} orderBy="updatedAt">Updated On</ThSort>
        </tr>
        <tr>
          <ThFilter {handler} filterBy="title" />
          <ThFilter {handler} filterBy="price" />
          <ThFilter {handler} filterBy="createdAt" />
          <ThFilter {handler} filterBy="updatedAt" />
        </tr>
      </thead>
      <tbody>
        {#each $rows as row}
          <tr>
            <td>{capitalize(row.title)}</td>
            <td>Php {row.price.toFixed(2)}</td>
            <td
              >{dateFormatter("en-PH", dateOption, new Date(row.createdAt))}
            </td>
            <td
              >{dateFormatter("en-PH", dateOption, new Date(row.updatedAt))}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <footer class="flex justify-between">
    <RowCount {handler} />
    <Pagination {handler} />
  </footer>
</div>
