using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RamSirId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("36f7bbbc-2908-4533-ac85-a2d9b9311d40"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("a34847e6-32c2-4e54-b598-2cec7ebace5d"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "1sO7zPDtq9v7c8MgWxGEsHCxKu0LRQ8N8fWIOhB4kRQ=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 9, 19, 9, 16, 1, 137, DateTimeKind.Unspecified).AddTicks(7655), new TimeSpan(0, 0, 0, 0, 0)), "QsdfmHf1CQi/9uOv3nF31A==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("a34847e6-32c2-4e54-b598-2cec7ebace5d"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("36f7bbbc-2908-4533-ac85-a2d9b9311d40"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "zcMZXJ6isZjVyoughFOYzbNmFC91seo8MQ2DMi+/dO4=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 9, 19, 7, 47, 44, 192, DateTimeKind.Unspecified).AddTicks(1240), new TimeSpan(0, 0, 0, 0, 0)), "AOCjvVVk6fD1+85nDbABzA==", (byte)1 });
        }
    }
}
