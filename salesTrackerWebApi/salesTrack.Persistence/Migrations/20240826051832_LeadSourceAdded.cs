using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class LeadSourceAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("7bec2942-d189-4bc9-9312-917799bf0024"));

            migrationBuilder.DropColumn(
                name: "LeadSource",
                table: "Leads");

            migrationBuilder.AddColumn<Guid>(
                name: "LeadSourceId",
                table: "Leads",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "LeadSources",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LeadSourceName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    ModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ModifiedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeletedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeadSources", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("69d6aac6-0478-424c-8af1-e78986ca2151"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "LPTTk94PkKPwikPCfnP0fU8mA4Y8gDDSNfawTVLv4W8=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 26, 5, 33, 30, 30, DateTimeKind.Unspecified).AddTicks(4468), new TimeSpan(0, 0, 0, 0, 0)), "FRIy0KJHTGSHuS9juiv+AQ==", (byte)1, (byte)0 });

            migrationBuilder.CreateIndex(
                name: "IX_Leads_LeadSourceId",
                table: "Leads",
                column: "LeadSourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Leads_LeadSources_LeadSourceId",
                table: "Leads",
                column: "LeadSourceId",
                principalTable: "LeadSources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leads_LeadSources_LeadSourceId",
                table: "Leads");

            migrationBuilder.DropTable(
                name: "LeadSources");

            migrationBuilder.DropIndex(
                name: "IX_Leads_LeadSourceId",
                table: "Leads");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("69d6aac6-0478-424c-8af1-e78986ca2151"));

            migrationBuilder.DropColumn(
                name: "LeadSourceId",
                table: "Leads");

            migrationBuilder.AddColumn<string>(
                name: "LeadSource",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("7bec2942-d189-4bc9-9312-917799bf0024"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "sQTfJCx5Kdc9OftW/syXcBCCGlBOc8i9RIcmoc94F6Y=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 23, 10, 40, 3, 320, DateTimeKind.Unspecified).AddTicks(4786), new TimeSpan(0, 0, 0, 0, 0)), "xaHGgXujl1dhvNUIOmTonA==", (byte)1, (byte)0 });
        }
    }
}
