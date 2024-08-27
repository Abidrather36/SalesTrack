using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class leadUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("21ef35f7-18fa-4ae5-bf11-40232202efd0"));

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Leads");

            migrationBuilder.AlterColumn<byte>(
                name: "FinalStatus",
                table: "Leads",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("b18c9201-1252-4b45-ae6f-e8743a5aaaee"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "KLuKA3Rq4ALFmCN61F0oLL8GYU9jsItPtVj/SSPVd9c=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 27, 5, 23, 59, 97, DateTimeKind.Unspecified).AddTicks(5572), new TimeSpan(0, 0, 0, 0, 0)), "XRJhpGB0kK7jiW1vs4eqFA==", (byte)1, (byte)0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("b18c9201-1252-4b45-ae6f-e8743a5aaaee"));

            migrationBuilder.AlterColumn<int>(
                name: "FinalStatus",
                table: "Leads",
                type: "int",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("21ef35f7-18fa-4ae5-bf11-40232202efd0"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "hqW4BPosR9RdJw6Rxt+UNTtmv22N0umjCD7be1RSl54=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 26, 9, 24, 48, 745, DateTimeKind.Unspecified).AddTicks(3905), new TimeSpan(0, 0, 0, 0, 0)), "Pa1QsyQODjrStyz0Rk8QUA==", (byte)1, (byte)0 });
        }
    }
}
