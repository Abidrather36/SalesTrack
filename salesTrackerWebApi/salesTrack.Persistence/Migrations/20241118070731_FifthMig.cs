using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FifthMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("2e44b1a7-5a44-4212-86e5-96336e5bb70a"));

            migrationBuilder.DropColumn(
                name: "LeadName",
                table: "Leads");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("7c1bc0b5-780e-40c1-9a6d-56de225e21b9"), null, new DateTimeOffset(new DateTime(2024, 11, 18, 12, 37, 28, 376, DateTimeKind.Unspecified).AddTicks(1660), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "f/7IFCmM4PdudHJAJ1O4zmiVYzqiVD7W4kJpOimvG5E=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 11, 18, 7, 22, 28, 376, DateTimeKind.Unspecified).AddTicks(1723), new TimeSpan(0, 0, 0, 0, 0)), "oStdkdZKVM3TfAWLmocY1g==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("7c1bc0b5-780e-40c1-9a6d-56de225e21b9"));

            migrationBuilder.AddColumn<string>(
                name: "LeadName",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("2e44b1a7-5a44-4212-86e5-96336e5bb70a"), null, new DateTimeOffset(new DateTime(2024, 11, 17, 17, 56, 36, 595, DateTimeKind.Unspecified).AddTicks(4630), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "p+glSAUfyYPbkt6izrbzGbx4CI4lJLdPTEKH9q3nxJc=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 11, 17, 12, 41, 36, 595, DateTimeKind.Unspecified).AddTicks(4692), new TimeSpan(0, 0, 0, 0, 0)), "L4VNMLLEFZv1vporsG4ztA==", (byte)1 });
        }
    }
}
