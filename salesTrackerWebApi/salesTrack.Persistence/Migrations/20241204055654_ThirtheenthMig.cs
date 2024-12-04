using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ThirtheenthMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("627ed5fb-d9fe-4a0d-84f0-6a220be3e398"));

            migrationBuilder.AddColumn<Guid>(
                name: "CompanyId",
                table: "LeadCategories",
                type: "uniqueidentifier",
                nullable: true,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("01b758dc-d688-4ccd-a393-9832b2cefc85"), null, new DateTimeOffset(new DateTime(2024, 12, 4, 11, 26, 51, 385, DateTimeKind.Unspecified).AddTicks(6650), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "jAVztQsk1n/gPG4nhOcpQ97UEBi3Yydwyt7j2V+rTbo=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 12, 4, 6, 11, 51, 385, DateTimeKind.Unspecified).AddTicks(6714), new TimeSpan(0, 0, 0, 0, 0)), "8VtQsPHMyFfUkqYoiq3FuA==", (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_LeadCategories_CompanyId",
                table: "LeadCategories",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_LeadCategories_Companies_CompanyId",
                table: "LeadCategories",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeadCategories_Companies_CompanyId",
                table: "LeadCategories");

            migrationBuilder.DropIndex(
                name: "IX_LeadCategories_CompanyId",
                table: "LeadCategories");

            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("01b758dc-d688-4ccd-a393-9832b2cefc85"));

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "LeadCategories");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("627ed5fb-d9fe-4a0d-84f0-6a220be3e398"), null, new DateTimeOffset(new DateTime(2024, 12, 3, 14, 23, 39, 114, DateTimeKind.Unspecified).AddTicks(553), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "8/BdgVfl940Ogb7y5ucEtRV4sS+m6FB2LT1U+9ueh+4=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 12, 3, 9, 8, 39, 114, DateTimeKind.Unspecified).AddTicks(707), new TimeSpan(0, 0, 0, 0, 0)), "cAH5j3R04cfotVJzsmVN/g==", (byte)1 });
        }
    }
}
