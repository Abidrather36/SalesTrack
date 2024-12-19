using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class IsApprovedInTimeSheet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("75ac637b-6a42-4a74-82fa-a93a52a5c5ef"));

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "TimeSheets",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("86fc34eb-ed06-4bf5-a84f-52181e8a240b"), null, new DateTimeOffset(new DateTime(2024, 12, 17, 16, 56, 1, 215, DateTimeKind.Unspecified).AddTicks(2048), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "b+pTKvi/C3vkyHxBsuqKXqCIvofrU3d0Hz1NRCBbVE8=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 12, 17, 11, 41, 1, 215, DateTimeKind.Unspecified).AddTicks(2122), new TimeSpan(0, 0, 0, 0, 0)), "BJCIaepaFVefHgn6e9VDVw==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("86fc34eb-ed06-4bf5-a84f-52181e8a240b"));

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "TimeSheets");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("75ac637b-6a42-4a74-82fa-a93a52a5c5ef"), null, new DateTimeOffset(new DateTime(2024, 12, 17, 16, 40, 4, 596, DateTimeKind.Unspecified).AddTicks(4282), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "P3Os7Waw2l0uwvznAdEkwtHDuG+hop6FLXdBcQcofJA=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 12, 17, 11, 25, 4, 596, DateTimeKind.Unspecified).AddTicks(4343), new TimeSpan(0, 0, 0, 0, 0)), "tD9PgBULxcCSDZE85bo55Q==", (byte)1 });
        }
    }
}
