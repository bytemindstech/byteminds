<script lang="ts">
  import { DataHandler } from "@vincjo/datatables";
  import { match } from "ts-pattern";
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

  interface Props {
    data: any;
  }

  let { data }: Props = $props();

  const handler = new DataHandler(data, { rowsPerPage: 5 });
  const rows = handler.getRows();

  const getUserRole = (role: Role | null) => {
    if (role) {
      return match(role)
        .with("ADMIN", () => "admin")
        .with("TUTOR", () => "tutor")
        .with("PARENT", () => "parent")
        .with("STUDENT", () => "student")
        .otherwise(() => "user");
    }
  };
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
          <ThSort {handler} orderBy="firstName">First Name</ThSort>
          <ThSort {handler} orderBy="lastName">Last Name</ThSort>
          <ThSort {handler} orderBy="email">Email</ThSort>
          <ThSort {handler} orderBy="isEmailVerified">Email Status</ThSort>
          <ThSort {handler} orderBy="role">Role</ThSort>
          <ThSort {handler} orderBy="updatedAt">Last Login</ThSort>
        </tr>
        <tr>
          <ThFilter {handler} filterBy="firstName" />
          <ThFilter {handler} filterBy="lastName" />
          <ThFilter {handler} filterBy="email" />
          <ThFilter {handler} filterBy="isEmailVerified" />
          <ThFilter {handler} filterBy="role" />
          <ThFilter {handler} filterBy="updatedAt" />
        </tr>
      </thead>
      <tbody>
        {#each $rows as row}
          {#if row.role !== "ADMIN"}
            <tr>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.isEmailVerified ? "verified" : "not verified"}</td>
              <td>{getUserRole(row.role)}</td>
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
