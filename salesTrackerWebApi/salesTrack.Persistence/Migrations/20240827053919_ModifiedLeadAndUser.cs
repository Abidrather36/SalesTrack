using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedLeadAndUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("b18c9201-1252-4b45-ae6f-e8743a5aaaee"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("2535e498-876c-4cc5-9886-c734a3469aa1"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "7w6yj2AQ3lybTnl8dykS7irDWuA0ltzFBOjuyxmGUbU=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 27, 5, 54, 19, 136, DateTimeKind.Unspecified).AddTicks(7843), new TimeSpan(0, 0, 0, 0, 0)), "AveKWRI29Wj5HwEzHhJmIg==", (byte)1, (byte)0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("2535e498-876c-4cc5-9886-c734a3469aa1"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("b18c9201-1252-4b45-ae6f-e8743a5aaaee"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "KLuKA3Rq4ALFmCN61F0oLL8GYU9jsItPtVj/SSPVd9c=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 27, 5, 23, 59, 97, DateTimeKind.Unspecified).AddTicks(5572), new TimeSpan(0, 0, 0, 0, 0)), "XRJhpGB0kK7jiW1vs4eqFA==", (byte)1, (byte)0 });
        }
    }
}
