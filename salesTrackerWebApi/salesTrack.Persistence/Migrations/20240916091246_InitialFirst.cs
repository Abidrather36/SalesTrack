using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialFirst : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("554eb09c-9710-47d3-aff7-a07fb68b613d"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("2fed4cff-4291-4616-92ff-924b747ff6c2"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "IdFoIjmTcvPS4m5Gao9x3hpPJuHRmg+bzZ6TsD5EtRM=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 9, 16, 9, 27, 45, 541, DateTimeKind.Unspecified).AddTicks(6177), new TimeSpan(0, 0, 0, 0, 0)), "jZh5D8F9eRxudfjy8VgF6Q==", (byte)1, (byte)0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("2fed4cff-4291-4616-92ff-924b747ff6c2"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("554eb09c-9710-47d3-aff7-a07fb68b613d"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "ZK+0m60CgNUld9boWIA1AJ0BQTz7FXrds+On6uA4/fg=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 9, 16, 9, 18, 50, 904, DateTimeKind.Unspecified).AddTicks(3642), new TimeSpan(0, 0, 0, 0, 0)), "1qiVp2dWnQt/1odCt304EQ==", (byte)1, (byte)0 });
        }
    }
}
