using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class processStepAndFollowUpUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("dbfabf5c-4f45-47d6-b18d-1238dcc35ff3"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("f332e340-ef71-4e33-b6e4-297fbb781a09"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "aowonKl2qFbWqvS1yPBs/XGm5kPtmehmsNQNMe+5pxo=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 29, 7, 29, 47, 485, DateTimeKind.Unspecified).AddTicks(8478), new TimeSpan(0, 0, 0, 0, 0)), "QXv3ho1DDSSU+fspQpkOJQ==", (byte)1, (byte)0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("f332e340-ef71-4e33-b6e4-297fbb781a09"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("dbfabf5c-4f45-47d6-b18d-1238dcc35ff3"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "6WGwyUUnNCkedMS5uQxb8fGAzggf7Ae566NsC74jRYM=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 29, 7, 21, 43, 802, DateTimeKind.Unspecified).AddTicks(3094), new TimeSpan(0, 0, 0, 0, 0)), "NsmptQJDErtQ3XoY8SQurQ==", (byte)1, (byte)0 });
        }
    }
}
