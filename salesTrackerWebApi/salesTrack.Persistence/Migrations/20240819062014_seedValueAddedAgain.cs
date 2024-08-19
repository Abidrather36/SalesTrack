using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class seedValueAddedAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("2db3ab2a-4ba5-4381-8929-ca330ddb403f"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "ContactNo", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PostalCode", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("57b4ebc3-8b8e-4ae6-be42-0da2fafa3917"), "123 Main St hebbal", "6545454543", null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "qNnW+G75JThnZgKEJZEYNknIvTFFODlMzoi4ulW1I6U=", "12345", 12345, new DateTimeOffset(new DateTime(2024, 8, 19, 6, 35, 14, 15, DateTimeKind.Unspecified).AddTicks(2321), new TimeSpan(0, 0, 0, 0, 0)), "Uqs30XK9XloNEmrPcupUcA==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("57b4ebc3-8b8e-4ae6-be42-0da2fafa3917"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "ContactNo", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PostalCode", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("2db3ab2a-4ba5-4381-8929-ca330ddb403f"), "123 Main St hebbal", "6545454543", null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "ramrk@123", "12345", 12345, new DateTimeOffset(new DateTime(2024, 8, 19, 6, 32, 47, 873, DateTimeKind.Unspecified).AddTicks(6121), new TimeSpan(0, 0, 0, 0, 0)), "wQ/PbseHOvcOzYdMafKHtw==", (byte)1 });
        }
    }
}
