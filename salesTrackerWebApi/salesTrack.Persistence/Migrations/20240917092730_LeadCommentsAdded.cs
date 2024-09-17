using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class LeadCommentsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("866315bb-44fa-43a5-8012-40bf436d03dd"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("84c3e094-7edb-4a88-b379-912ecfaf8c2d"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "wJNaxlyRDE4gyygTsZQgUu+DPewEU+u06ToNIcJJKzM=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 9, 17, 9, 42, 29, 391, DateTimeKind.Unspecified).AddTicks(9899), new TimeSpan(0, 0, 0, 0, 0)), "gT7AJAK+kb4NYVea4RL25g==", (byte)1, (byte)0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("84c3e094-7edb-4a88-b379-912ecfaf8c2d"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("866315bb-44fa-43a5-8012-40bf436d03dd"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "flbJoS/q3X4OdeC9EdQBn6thORgVaW2Sme7XLaw/SaI=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 9, 17, 8, 55, 29, 305, DateTimeKind.Unspecified).AddTicks(7563), new TimeSpan(0, 0, 0, 0, 0)), "amYE58d16C0IV7BzmSQlHQ==", (byte)1, (byte)0 });
        }
    }
}
