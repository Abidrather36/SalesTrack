using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class dateChecker : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("15eda46a-374e-42ce-8ba5-2a272354099d"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("870d5838-0a0f-4267-957f-89fcdd19ec11"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "WZtmbaeK/FqjIM9WDe5/VQ4IlxkIHV0yQ7QrcKnVfbU=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 4, 5, 33, 34, 198, DateTimeKind.Unspecified).AddTicks(5262), new TimeSpan(0, 0, 0, 0, 0)), "UGh6xuYb069Wq8WxNMvj2w==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("870d5838-0a0f-4267-957f-89fcdd19ec11"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("15eda46a-374e-42ce-8ba5-2a272354099d"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "fyMlcw6DQctF4osdFA1mGiftfxy8P6Zx52CIRCNJQOk=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 1, 9, 48, 18, 393, DateTimeKind.Unspecified).AddTicks(8620), new TimeSpan(0, 0, 0, 0, 0)), "5l6nq1uGPZBFSxAETh3EDw==", (byte)1 });
        }
    }
}
