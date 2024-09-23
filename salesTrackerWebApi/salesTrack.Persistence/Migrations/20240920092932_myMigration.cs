using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class myMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("263ec308-f4bf-4569-a19c-453b49733e9a"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("4f1d3e7f-edd0-4f1d-9748-d988f3730cf7"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "BYYZj9Vt0acn/2NlZik6pLe0cc+v7wQiHBZRkW6HzG0=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 9, 20, 9, 44, 31, 573, DateTimeKind.Unspecified).AddTicks(1095), new TimeSpan(0, 0, 0, 0, 0)), "VdnalCIy8RS9gfRuxoFkjg==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("4f1d3e7f-edd0-4f1d-9748-d988f3730cf7"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("263ec308-f4bf-4569-a19c-453b49733e9a"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "mws+7klJVuwsU89AMqlpYWN88vix/qwV8ueNJKOY1jA=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 9, 20, 9, 41, 9, 863, DateTimeKind.Unspecified).AddTicks(7383), new TimeSpan(0, 0, 0, 0, 0)), "4J1IHYryurjhWtQNbLIJGQ==", (byte)1 });
        }
    }
}
