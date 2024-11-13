<script lang="ts">
  import { DataHandler } from "@vincjo/datatables";
  import { dateOption } from "$lib/util.client";
  import {
    Search,
    RowsPerPage,
    RowCount,
    ThSort,
    ThFilter,
    Pagination,
  } from "./ui";

  import dateFormatter from "@jhenbert/date-formatter";

  interface Props {
    tableData: any;
  }

  let { tableData }: Props = $props();

  const handler = new DataHandler(tableData, { rowsPerPage: 5 });
  const rows = handler.getRows();
</script>

<div class="mt-6 space-y-2">
  <header class="flex justify-between gap-4">
    <Search {handler} />
    <RowsPerPage {handler} />
  </header>

  <div class="table-container">
    <table class="table table-hover table-compact w-full table-auto">
      <thead>
        <tr>
          <ThSort {handler} orderBy="id">inhouse tutor ID</ThSort>
          <ThSort {handler} orderBy="name">full name</ThSort>
          <ThSort {handler} orderBy="subjectTaught">subject taught</ThSort>
          <ThSort {handler} orderBy="createdAt">registered on</ThSort>
          <ThSort {handler} orderBy="">actions</ThSort>
        </tr>
        <tr>
          <ThFilter {handler} filterBy="id" />
          <ThFilter {handler} filterBy="name" />
          <ThFilter {handler} filterBy="subjectTaught" />
          <ThFilter {handler} filterBy="createdAt" />
          <ThFilter {handler} filterBy="" />
        </tr>
      </thead>
      <tbody>
        {#each $rows as row}
          <tr>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.subjectTaught}</td>
            <td
              >{row.createdAt
                ? dateFormatter("en-PH", dateOption, new Date(row.createdAt))
                : ""}
            </td>
            <td>edit | delete</td>
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
