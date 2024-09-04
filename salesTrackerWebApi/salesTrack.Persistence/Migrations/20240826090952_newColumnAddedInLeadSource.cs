using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class newColumnAddedInLeadSource : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("b02df487-abd6-4848-8133-f04b6998218e"));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "LeadSources",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("21ef35f7-18fa-4ae5-bf11-40232202efd0"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "hqW4BPosR9RdJw6Rxt+UNTtmv22N0umjCD7be1RSl54=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 26, 9, 24, 48, 745, DateTimeKind.Unspecified).AddTicks(3905), new TimeSpan(0, 0, 0, 0, 0)), "Pa1QsyQODjrStyz0Rk8QUA==", (byte)1, (byte)0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("21ef35f7-18fa-4ae5-bf11-40232202efd0"));

            migrationBuilder.DropColumn(
                name: "Description",
                table: "LeadSources");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("b02df487-abd6-4848-8133-f04b6998218e"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "hd3IZI8XhKpIpSv4rVR+9xW7onwLHbmhjwbKMLreR+s=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 26, 6, 54, 18, 120, DateTimeKind.Unspecified).AddTicks(8058), new TimeSpan(0, 0, 0, 0, 0)), "mPou+BYCJAK0txiBzLUGtw==", (byte)1, (byte)0 });
        }
    }
}
