using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class LeadAndCompanyRealtionship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("4f1d3e7f-edd0-4f1d-9748-d988f3730cf7"));

            migrationBuilder.AddColumn<Guid>(
                name: "CompanyId",
                table: "Leads",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("7ec27075-3a19-4bb8-a5ff-a20ef959155d"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "FbPSeRQPV8Qb50RIhYs7PXymWZMCehwDtoJbw65gqQU=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 9, 23, 5, 42, 1, 649, DateTimeKind.Unspecified).AddTicks(4736), new TimeSpan(0, 0, 0, 0, 0)), "nBQGAJXs3XDSc3yN5oFp2g==", (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_Leads_CompanyId",
                table: "Leads",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Leads_Companies_CompanyId",
                table: "Leads",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leads_Companies_CompanyId",
                table: "Leads");

            migrationBuilder.DropIndex(
                name: "IX_Leads_CompanyId",
                table: "Leads");

            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("7ec27075-3a19-4bb8-a5ff-a20ef959155d"));

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Leads");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("4f1d3e7f-edd0-4f1d-9748-d988f3730cf7"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "BYYZj9Vt0acn/2NlZik6pLe0cc+v7wQiHBZRkW6HzG0=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 9, 20, 9, 44, 31, 573, DateTimeKind.Unspecified).AddTicks(1095), new TimeSpan(0, 0, 0, 0, 0)), "VdnalCIy8RS9gfRuxoFkjg==", (byte)1 });
        }
    }
}
