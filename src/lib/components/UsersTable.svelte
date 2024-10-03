<script lang="ts">
  import { DataHandler } from "@vincjo/datatables";
  import dateFormatter from "@jhenbert/date-formatter";
  import { dateOption } from "$lib/util.client";
  import type { Role } from "@prisma/client";
  import {
    Search,
    RowsPerPage,
    RowCount,
    ThSort,
    ThFilter,
    Pagination,
  } from "./ui";
  import { route } from "$lib/ROUTES";

  export let tableData;
  export let role: Role;

  const handler = new DataHandler(tableData, { rowsPerPage: 5 });
  const rows = handler.getRows();
</script>

<div class="space-y-2">
  <header class="flex justify-between gap-4">
    <Search {handler} />
    <RowsPerPage {handler} />
  </header>

  <div class="table-container">
    <table class="table table-hover table-compact table-auto w-full">
      <thead>
        <tr>
          <ThSort {handler} orderBy="id">User ID</ThSort>
          <ThSort {handler} orderBy="firstName">First Name</ThSort>
          <ThSort {handler} orderBy="lastName">Last Name</ThSort>
          <ThSort {handler} orderBy="email">Email</ThSort>
          <ThSort {handler} orderBy="isEmailVerified">Email Status</ThSort>
          <ThSort {handler} orderBy="updatedAt">Last Login</ThSort>
        </tr>
        <tr>
          <ThFilter {handler} filterBy="id" />
          <ThFilter {handler} filterBy="firstName" />
          <ThFilter {handler} filterBy="lastName" />
          <ThFilter {handler} filterBy="email" />
          <ThFilter {handler} filterBy="isEmailVerified" />
          <ThFilter {handler} filterBy="updatedAt" />
        </tr>
      </thead>
      <tbody>
        {#each $rows as row}
          {#if row.role === role}
            <tr>
              <td
                ><a
                  href={route("/admin/profile/[id]", { id: row.id })}
                  class="anchor"
                  >{row.id}
                </a>
              </td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.isEmailVerified ? "verified" : "not verified"}</td>
              <td>{dateFormatter("en-PH", dateOption, row.updatedAt)}</td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>

  <footer class="flex justify-between">
    <RowCount {handler} />
    <Pagination {handler} />
  </footer>
</div>
