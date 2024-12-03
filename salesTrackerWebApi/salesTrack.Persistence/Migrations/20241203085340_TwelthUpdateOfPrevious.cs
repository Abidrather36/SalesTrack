using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class TwelthUpdateOfPrevious : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("3d30d7ef-d6bf-4927-8be2-8e3b219b5bdd"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("627ed5fb-d9fe-4a0d-84f0-6a220be3e398"), null, new DateTimeOffset(new DateTime(2024, 12, 3, 14, 23, 39, 114, DateTimeKind.Unspecified).AddTicks(553), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "8/BdgVfl940Ogb7y5ucEtRV4sS+m6FB2LT1U+9ueh+4=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 12, 3, 9, 8, 39, 114, DateTimeKind.Unspecified).AddTicks(707), new TimeSpan(0, 0, 0, 0, 0)), "cAH5j3R04cfotVJzsmVN/g==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("627ed5fb-d9fe-4a0d-84f0-6a220be3e398"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("3d30d7ef-d6bf-4927-8be2-8e3b219b5bdd"), null, new DateTimeOffset(new DateTime(2024, 12, 3, 14, 13, 6, 515, DateTimeKind.Unspecified).AddTicks(9891), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "wkjb3N5rcZR56VI1HoBN42Yov0ZOPpycbSksaHfLCsk=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 12, 3, 8, 58, 6, 515, DateTimeKind.Unspecified).AddTicks(9977), new TimeSpan(0, 0, 0, 0, 0)), "wHqlJB3zPyiIVQV1yEQaWQ==", (byte)1 });
        }
    }
}
