using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EightMigFiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("b438c57d-0aed-4d26-a209-063700c543ee"));

            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("2d287223-fdd7-4c66-bfa8-6aebcb49b7d8"), null, new DateTimeOffset(new DateTime(2024, 11, 26, 12, 11, 14, 25, DateTimeKind.Unspecified).AddTicks(5919), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "Q360pVzF4ZNnzGFJ++jwceyCzqo7/6XKu7GXXfTUaYg=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 11, 26, 6, 56, 14, 25, DateTimeKind.Unspecified).AddTicks(6090), new TimeSpan(0, 0, 0, 0, 0)), "BMd87dh+JJTwbBgOrm4Guw==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("2d287223-fdd7-4c66-bfa8-6aebcb49b7d8"));

            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Users");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("b438c57d-0aed-4d26-a209-063700c543ee"), null, new DateTimeOffset(new DateTime(2024, 11, 20, 17, 2, 38, 236, DateTimeKind.Unspecified).AddTicks(3132), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "2V1nOyT/Y3RV0ddpM3RdiEE9U7A6hO4qFHpK7eOwsMY=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 11, 20, 11, 47, 38, 236, DateTimeKind.Unspecified).AddTicks(3191), new TimeSpan(0, 0, 0, 0, 0)), "+Fl/RLZjAOF1GieK+jPVsQ==", (byte)1 });
        }
    }
}
