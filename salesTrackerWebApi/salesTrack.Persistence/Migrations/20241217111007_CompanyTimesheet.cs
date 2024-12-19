using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CompanyTimesheet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanyTimeSheets_Companies_CompanyId",
                table: "CompanyTimeSheets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyTimeSheets",
                table: "CompanyTimeSheets");

            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("9abb2bb6-1bd4-445f-9a9d-fc6292dfad3e"));

            migrationBuilder.RenameTable(
                name: "CompanyTimeSheets",
                newName: "CompanyTimeSheetStep");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyTimeSheets_CompanyId",
                table: "CompanyTimeSheetStep",
                newName: "IX_CompanyTimeSheetStep_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyTimeSheetStep",
                table: "CompanyTimeSheetStep",
                column: "Id");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("75ac637b-6a42-4a74-82fa-a93a52a5c5ef"), null, new DateTimeOffset(new DateTime(2024, 12, 17, 16, 40, 4, 596, DateTimeKind.Unspecified).AddTicks(4282), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "P3Os7Waw2l0uwvznAdEkwtHDuG+hop6FLXdBcQcofJA=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 12, 17, 11, 25, 4, 596, DateTimeKind.Unspecified).AddTicks(4343), new TimeSpan(0, 0, 0, 0, 0)), "tD9PgBULxcCSDZE85bo55Q==", (byte)1 });

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyTimeSheetStep_Companies_CompanyId",
                table: "CompanyTimeSheetStep",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanyTimeSheetStep_Companies_CompanyId",
                table: "CompanyTimeSheetStep");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyTimeSheetStep",
                table: "CompanyTimeSheetStep");

            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("75ac637b-6a42-4a74-82fa-a93a52a5c5ef"));

            migrationBuilder.RenameTable(
                name: "CompanyTimeSheetStep",
                newName: "CompanyTimeSheets");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyTimeSheetStep_CompanyId",
                table: "CompanyTimeSheets",
                newName: "IX_CompanyTimeSheets_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyTimeSheets",
                table: "CompanyTimeSheets",
                column: "Id");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("9abb2bb6-1bd4-445f-9a9d-fc6292dfad3e"), null, new DateTimeOffset(new DateTime(2024, 12, 17, 14, 29, 37, 468, DateTimeKind.Unspecified).AddTicks(8460), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "hOgGuD7DwETUnvfDsO/2F02TQAevKKZPzuDjEEG+ny8=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 12, 17, 9, 14, 37, 468, DateTimeKind.Unspecified).AddTicks(8525), new TimeSpan(0, 0, 0, 0, 0)), "bAmOpxsjCSpGKfp53MGw7Q==", (byte)1 });

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyTimeSheets_Companies_CompanyId",
                table: "CompanyTimeSheets",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
