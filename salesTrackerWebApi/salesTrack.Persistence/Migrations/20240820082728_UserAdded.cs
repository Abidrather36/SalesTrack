using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UserAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("57b4ebc3-8b8e-4ae6-be42-0da2fafa3917"));

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ContactNo",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "PostalCode",
                table: "Users",
                newName: "PhoneNumber");

            migrationBuilder.AddColumn<Guid>(
                name: "ReportsTo",
                table: "Users",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "UserType",
                table: "Users",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("053f0406-7db8-4058-b3b8-299937e922af"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "cYQRKcefNUOHwSo7pG+g3l17cEkvRZKXE+fCkvogOcI=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 20, 8, 42, 26, 382, DateTimeKind.Unspecified).AddTicks(3742), new TimeSpan(0, 0, 0, 0, 0)), "nDgHOhPeJHQ7YiQ3VU0PHQ==", (byte)1, (byte)0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("053f0406-7db8-4058-b3b8-299937e922af"));

            migrationBuilder.DropColumn(
                name: "ReportsTo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserType",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Users",
                newName: "PostalCode");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactNo",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "ContactNo", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PostalCode", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("57b4ebc3-8b8e-4ae6-be42-0da2fafa3917"), "123 Main St hebbal", "6545454543", null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "qNnW+G75JThnZgKEJZEYNknIvTFFODlMzoi4ulW1I6U=", "12345", 12345, new DateTimeOffset(new DateTime(2024, 8, 19, 6, 35, 14, 15, DateTimeKind.Unspecified).AddTicks(2321), new TimeSpan(0, 0, 0, 0, 0)), "Uqs30XK9XloNEmrPcupUcA==", (byte)1 });
        }
    }
}
